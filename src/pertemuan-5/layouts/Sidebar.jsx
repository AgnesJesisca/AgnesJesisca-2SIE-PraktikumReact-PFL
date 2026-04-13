import { MdDashboard, MdAssignment, MdPeople, MdAdd } from "react-icons/md";

export default function Sidebar() {
  return (
    /* 2️⃣ Layout utama Sidebar */
    <div 
      id="sidebar" 
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      
      {/* 3️⃣ Bagian Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* 4️⃣ & 6️⃣ Bagian List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          {/* Menu Dashboard */}
          <li>
            <div id="menu-1" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
              <MdDashboard className="mr-4 text-xl" /> 
              <span>Dashboard</span>
            </div>
          </li>
          
          {/* Menu Orders */}
          <li>
            <div id="menu-2" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
              <MdAssignment className="mr-4 text-xl" /> 
              <span>Orders</span>
            </div>
          </li>

          {/* Menu Customers */}
          <li>
            <div id="menu-3" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
              <MdPeople className="mr-4 text-xl" /> 
              <span>Customers</span>
            </div>
          </li>
        </ul>
      </div>

      {/* 5️⃣ & 6️⃣ Bagian Footer Sidebar */}
      <div id="sidebar-footer" className="mt-auto">
        
        {/* Card Hijau */}
        <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            
            {/* Tombol Add Menus */}
            <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
              <span className="text-gray-600 flex items-center font-bold">
                <MdAdd className="mr-2 text-xl" /> 
                Add Menus
              </span>
            </div>
          </div>

          {/* Avatar */}
          <img 
            id="footer-avatar" 
            src="https://i.pinimg.com/736x/2f/a4/72/2fa4722011490073ad1e09422cf1bc37.jpg" 
            className="w-20 rounded-full ml-4" 
            alt="User Avatar"
          />
        </div>

        {/* Branding & Copyright */}
        <span id="footer-brand" className="font-bold text-gray-400 block">
          Sedap Restaurant Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>

    </div>
  );
}