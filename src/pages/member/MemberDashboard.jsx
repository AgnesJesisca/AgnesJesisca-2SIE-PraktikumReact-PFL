import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { TIER_DISCOUNT, TIER_THRESHOLDS, getNextTier } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', profile?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) setRecentOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const tier = profile?.tier || 'bronze';
  const points = profile?.points || 0;
  const discountPercent = TIER_DISCOUNT[tier] || 5;
  const nextTierInfo = getNextTier(tier, points);

  // Progress calculation
  let progressPercent = 100;
  let progressLabel = "Maximum tier reached!";
  if (nextTierInfo) {
    const currentThreshold = TIER_THRESHOLDS[tier].min;
    const nextThreshold = TIER_THRESHOLDS[nextTierInfo.nextTier].min;
    const range = nextThreshold - currentThreshold;
    const earned = points - currentThreshold;
    progressPercent = Math.min(Math.round((earned / range) * 100), 100);
    progressLabel = `${nextTierInfo.pointsNeeded} more points to ${nextTierInfo.nextTier.toUpperCase()}`;
  }

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
          title="Member Dashboard"
          breadcrumb={`Welcome, ${profile?.full_name || 'Member'}!`}
        />

        {/* Profile & Tier Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-xl font-bold">{profile?.full_name || '-'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Current Tier</p>
            <p className="text-xl font-bold capitalize text-emerald-600">{tier}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Total Points</p>
            <p className="text-xl font-bold">{points}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-400 text-sm">Discount</p>
            <p className="text-xl font-bold">{discountPercent}%</p>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-lg font-semibold mb-3">Tier Progress</h3>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="capitalize">{tier}</span>
            {nextTierInfo && <span className="capitalize">{nextTierInfo.nextTier}</span>}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{progressLabel}</p>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3">Points</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    No orders yet. Start shopping!
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => (
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
