import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";

export default function Dashboard() {
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
              <span className="text-2xl font-bold">75</span>
              <span className="text-gray-400">Total Orders</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-blue-500 rounded-full p-4">
              <FaTruck className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">175</span>
              <span className="text-gray-400">Total Delivered</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-red-500 rounded-full p-4">
              <FaBan className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">40</span>
              <span className="text-gray-400">Total Canceled</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-yellow-500 rounded-full p-4">
              <FaDollarSign className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Rp.128</span>
              <span className="text-gray-400">Total Revenue</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}