import { MdDashboard, MdShoppingCart, MdAssignment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function MemberSidebar() {
  const { profile } = useAuth();

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
          Member Portal
        </span>
      </div>

      {/* Member Info */}
      {profile && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="font-semibold text-gray-800">{profile.full_name || 'Member'}</p>
          <p className="text-sm text-gray-500 capitalize">Tier: {profile.tier}</p>
          <p className="text-sm text-gray-500">Points: {profile.points}</p>
        </div>
      )}

      {/* Menu */}
      <div className="mt-10">
        <ul className="space-y-3">
          <li>
            <NavLink to="/member" end className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/member/orders" className={menuClass}>
              <MdAssignment className="mr-4 text-xl" />
              <span>My Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/member/checkout" className={menuClass}>
              <MdShoppingCart className="mr-4 text-xl" />
              <span>Checkout</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <span className="text-gray-400 text-sm block">
          Sedap Restaurant Member Portal
        </span>
      </div>
    </div>
  );
}
