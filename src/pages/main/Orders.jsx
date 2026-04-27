import { useState } from "react";
import ordersData from "../../data/orders.json"; 
import PageHeader from "../../components/PageHeader";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newOrder = {
      orderId: `ORD-${1000 + orders.length + 1}`,
      ...form
    };

    setOrders([...orders, newOrder]);
    setShowForm(false);

    setForm({
      customerName: "",
      status: "Pending",
      totalPrice: "",
      orderDate: ""
    });
  };

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

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-5 rounded shadow space-y-3">

            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="border p-2 w-full"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              type="number"
              name="totalPrice"
              value={form.totalPrice}
              onChange={handleChange}
              placeholder="Total Price"
              className="border p-2 w-full"
            />

            <input
              type="date"
              name="orderDate"
              value={form.orderDate}
              onChange={handleChange}
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

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.orderId} className="border-t">
                  <td className="p-3">{o.orderId}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium
                      ${o.status === "Completed" && "bg-green-100 text-green-600"}
                      ${o.status === "Pending" && "bg-yellow-100 text-yellow-600"}
                      ${o.status === "Cancelled" && "bg-red-100 text-red-600"}
                    `}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3">Rp{o.totalPrice}</td>
                  <td className="p-3">{o.orderDate}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}