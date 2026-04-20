import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "./assets/tailwind.css";

function App() {
  return (
   <div className="flex">
    <Sidebar />

    <div className="flex-1 bg-gray-50 min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          <Route path="/400" element={<ErrorPage code="400" message="Bad Request" />} />
          <Route path="/401" element={<ErrorPage code="401" message="Unauthorized" />} />
          <Route path="/403" element={<ErrorPage code="403" message="Forbidden" />} />

          <Route path="*" element={<ErrorPage code="404" message="It's look like you're lost" />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;