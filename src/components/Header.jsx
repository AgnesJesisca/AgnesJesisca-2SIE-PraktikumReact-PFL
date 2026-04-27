import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        /* 2️⃣ Terapkan layout dan flexbox untuk div header-container */
        <div id="header-container" className="flex justify-between items-center p-4">
            
            {/* 2️⃣ & 3️⃣ Search Bar Container */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
                />
                {/* 3️⃣ Styling search-icon */}
                <FaSearch 
                    id="search-icon" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" 
                />
            </div>

            {/* 2️⃣ Icon & Profile Section (icons-container) */}
            <div id="icons-container" className="flex items-center space-x-4">
                
                {/* 4️⃣ Notification Icon */}
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span 
                        id="notification-badge" 
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
                    >
                        50
                    </span>
                </div>

                {/* 4️⃣ Chart Icon */}
                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-xl">
                    <FcAreaChart />
                </div>

                {/* 4️⃣ Settings Icon */}
                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* 4️⃣ Profile Section */}
                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span id="profile-text" className="text-sm">
                        Hello, <b className="text-gray-900">Agnes Jesisca</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4X3pW6l2w5UVnKU4iAbZhS5PS_n7hkmaqhg&s"
                        className="w-10 h-10 rounded-full"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}