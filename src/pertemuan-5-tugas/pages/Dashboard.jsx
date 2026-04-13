import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="flex-1 bg-gray-50 min-h-screen">
            <PageHeader />

            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* IMPROVISASI 2 */}
                <div id="dashboard-orders" className="flex flex-col bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow border-b-4 border-hijau">
                    <div className="flex items-center space-x-5 mb-3">
                        <div id="orders-icon" className="bg-hijau rounded-full p-4">
                            <FaShoppingCart className="text-3xl text-white" />
                        </div>
                        <div id="orders-info" className="flex flex-col">
                            <span id="orders-count" className="text-2xl font-bold">75</span>
                            <span id="orders-text" className="text-gray-400">Total Orders</span>
                        </div>
                    </div>
                    {/* Visualisasi Progress */}
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-hijau h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">65% from monthly target</p>
                </div>

                {/* IMPROVISASI 3*/}
                <div id="dashboard-delivered" className="flex flex-col bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <div id="delivered-icon" className="bg-blue-500 rounded-full p-4">
                            <FaTruck className="text-3xl text-white" />
                        </div>
                        <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-md">+12.5%</span>
                    </div>
                    <div id="delivered-info" className="flex flex-col mt-2">
                        <span id="delivered-count" className="text-2xl font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                {/* Card TOTAL CANCELED */}
                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:bg-red-50 transition-colors">
                    <div id="canceled-icon" className="bg-red-500 rounded-full p-4">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                {/* Card TOTAL REVENUE */}
                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 group">
                    <div id="revenue-icon" className="bg-yellow-500 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold text-yellow-600">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>

            </div>
        </div>
    );
}