import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    // IMPROVISASI 1: Fungsi Greeting berdasarkan waktu real-time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div id="header-container" className="flex justify-between items-center p-4">
            
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none focus:ring-2 focus:ring-green-100 transition-all"
                />
                <FaSearch 
                    id="search-icon" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" 
                />
            </div>

            <div id="icons-container" className="flex items-center space-x-4">
                
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-200 transition-colors">
                    <FaBell />
                    <span 
                        id="notification-badge" 
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
                    >
                        50
                    </span>
                </div>

                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-xl hover:scale-110 transition-transform">
                    <FcAreaChart />
                </div>

                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:rotate-90 transition-transform duration-500">
                    <SlSettings />
                </div>

                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span id="profile-text" className="text-sm">
                        {/* Penerapan Improvisasi Greeting */}
                        {getGreeting()}, <b className="text-gray-900">Agnes Jesisca</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4X3pW6l2w5UVnKU4iAbZhS5PS_n7hkmaqhg&s"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}