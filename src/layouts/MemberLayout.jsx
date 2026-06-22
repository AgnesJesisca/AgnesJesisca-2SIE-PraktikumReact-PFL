import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/MemberSidebar";
import Header from "../components/Header";

export default function MemberLayout() {
  return (
    <div className="flex">
      <MemberSidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
