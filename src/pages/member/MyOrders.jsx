import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { TIER_DISCOUNT } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";

export default function MyOrders() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', profile?.id)
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
          title="My Orders"
          breadcrumb="Member / Order History"
        />

        {/* Tier & Points Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Current Tier</p>
            <p className="text-2xl font-bold capitalize text-emerald-600">
              {profile?.tier || 'bronze'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Total Points</p>
            <p className="text-2xl font-bold">{profile?.points || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Discount Rate</p>
            <p className="text-2xl font-bold">
              {TIER_DISCOUNT[profile?.tier] || 5}%
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Original</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Final</th>
                <th className="p-3">Points</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    No orders yet. Start shopping!
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-3 text-xs">{o.id.slice(0, 8)}...</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm font-medium capitalize
                        ${o.status === "completed" && "bg-green-100 text-green-600"}
                        ${o.status === "pending" && "bg-yellow-100 text-yellow-600"}
                        ${o.status === "cancelled" && "bg-red-100 text-red-600"}
                      `}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">Rp{Number(o.total_original).toLocaleString()}</td>
                    <td className="p-3 text-green-600">-Rp{Number(o.total_discount).toLocaleString()}</td>
                    <td className="p-3 font-semibold">Rp{Number(o.total_final).toLocaleString()}</td>
                    <td className="p-3 text-blue-600">+{o.points_earned}</td>
                    <td className="p-3">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
