import { MdDashboard, MdAssignment, MdPeople, MdAdd, MdInventory } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `flex items-center rounded-xl p-4 space-x-2
     ${isActive
       ? "text-green-600 bg-green-200 font-bold"
       : "text-gray-600 hover:text-green-600 hover:bg-green-200 hover:font-bold"
     }`;

  return (
    <div className="flex min-h-screen w-72 flex-col bg-white p-10 shadow-lg">
      
      {/* Logo */}
      <div className="flex flex-col">
        <span className="text-[48px] text-gray-900 font-bold">
          Sedap <b className="text-green-500">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-10">
        <ul className="space-y-3">

        <li>
          <NavLink to="/" className={menuClass}>
            <MdDashboard className="mr-4 text-xl" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={menuClass}>
            <MdAssignment className="mr-4 text-xl" />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers" className={menuClass}>
            <MdPeople className="mr-4 text-xl" />
            <span>Customers</span>
          </NavLink>
        </li>

        {/* 🔥 TAMBAHAN PRODUCTS */}
        <li>
          <NavLink to="/products" className={menuClass}>
            <MdInventory className="mr-4 text-xl" />
            <span>Products</span>
          </NavLink>
        </li>

        {/* Menu lain */}
        <li>
          <NavLink to="/400" className={menuClass}>
            Delivery
          </NavLink>
        </li>

        <li>
          <NavLink to="/401" className={menuClass}>
            Canceled
          </NavLink>
        </li>

        <li>
          <NavLink to="/403" className={menuClass}>
            Income
          </NavLink>
        </li>

      </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-green-500 text-white p-4 rounded-md mb-10 flex items-center">
          <div className="text-sm">
            <span>Please organize your menus!</span>

            <div className="flex items-center mt-3 bg-white text-gray-600 p-2 rounded-md cursor-pointer">
              <MdAdd className="mr-2" />
              Add Menus
            </div>
          </div>

          <img
            src="https://i.pinimg.com/736x/2f/a4/72/2fa4722011490073ad1e09422cf1bc37.jpg"
            className="w-16 rounded-full ml-4"
          />
        </div>

        <span className="text-gray-400 text-sm block">
          Sedap Restaurant Admin Dashboard
        </span>
      </div>

    </div>
  );
}