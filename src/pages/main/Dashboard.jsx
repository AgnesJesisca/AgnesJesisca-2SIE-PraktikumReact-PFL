import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "../../components/PageHeader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: orders } = await supabase
          .from('orders')
          .select('total_final, status');

        if (orders) {
          setStats({
            totalOrders: orders.length,
            totalDelivered: orders.filter(o => o.status === 'completed').length,
            totalCanceled: orders.filter(o => o.status === 'cancelled').length,
            totalRevenue: orders
              .filter(o => o.status === 'completed')
              .reduce((sum, o) => sum + Number(o.total_final), 0),
          });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      
      <div className="p-5 space-y-5">

        <PageHeader 
          title="Dashboard - Agnes Jesisca 🚀" 
          breadcrumb="Dashboard"
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-hijau rounded-full p-4">
              <FaShoppingCart className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.totalOrders}</span>
              <span className="text-gray-400">Total Orders</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-blue-500 rounded-full p-4">
              <FaTruck className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.totalDelivered}</span>
              <span className="text-gray-400">Total Delivered</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-red-500 rounded-full p-4">
              <FaBan className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.totalCanceled}</span>
              <span className="text-gray-400">Total Canceled</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-yellow-500 rounded-full p-4">
              <FaDollarSign className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Rp.{stats.totalRevenue.toLocaleString()}</span>
              <span className="text-gray-400">Total Revenue</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
