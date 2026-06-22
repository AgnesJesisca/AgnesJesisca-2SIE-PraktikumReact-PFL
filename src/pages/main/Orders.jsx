import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "../../components/PageHeader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    status: "pending",
    total_final: "",
    total_original: "",
    total_discount: 0,
    points_earned: 0,
  });

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, profiles!inner(full_name)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .order('full_name');

      if (data) setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        customer_id: form.customer_id,
        status: form.status,
        total_original: Number(form.total_original) || 0,
        total_discount: Number(form.total_discount) || 0,
        total_final: Number(form.total_final) || 0,
        points_earned: Number(form.points_earned) || 0,
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) {
        console.error('Error adding order:', error.message);
        return;
      }

      await fetchOrders();
      setShowForm(false);
      setForm({
        customer_id: "",
        status: "pending",
        total_final: "",
        total_original: "",
        total_discount: 0,
        points_earned: 0,
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating status:', error.message);
        return;
      }

      await fetchOrders();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-5 space-y-5">
        <PageHeader 
          title="Order" 
          breadcrumb="Dashboard / Order List"
        >
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-hijau text-white px-4 py-2 rounded-lg"
          >
            Add Order
          </button>
        </PageHeader>

        {showForm && (
          <div className="bg-white p-5 rounded shadow space-y-3">
            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.full_name}</option>
              ))}
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <input
              type="number"
              name="total_original"
              value={form.total_original}
              onChange={handleChange}
              placeholder="Total Original"
              className="border p-2 w-full"
            />

            <input
              type="number"
              name="total_discount"
              value={form.total_discount}
              onChange={handleChange}
              placeholder="Total Discount"
              className="border p-2 w-full"
            />

            <input
              type="number"
              name="total_final"
              value={form.total_final}
              onChange={handleChange}
              placeholder="Total Final"
              className="border p-2 w-full"
            />

            <input
              type="number"
              name="points_earned"
              value={form.points_earned}
              onChange={handleChange}
              placeholder="Points Earned"
              className="border p-2 w-full"
            />

            <button 
              onClick={handleSubmit}
              className="bg-hijau text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Original</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Final</th>
                <th className="p-3">Points</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-3 text-xs">{o.id.slice(0, 8)}...</td>
                  <td className="p-3">{o.profiles?.full_name || '-'}</td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-medium border-0 cursor-pointer
                        ${o.status === "completed" && "bg-green-100 text-green-600"}
                        ${o.status === "pending" && "bg-yellow-100 text-yellow-600"}
                        ${o.status === "cancelled" && "bg-red-100 text-red-600"}
                      `}
                    >
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">Rp{Number(o.total_original).toLocaleString()}</td>
                  <td className="p-3">Rp{Number(o.total_discount).toLocaleString()}</td>
                  <td className="p-3">Rp{Number(o.total_final).toLocaleString()}</td>
                  <td className="p-3">{o.points_earned}</td>
                  <td className="p-3">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
