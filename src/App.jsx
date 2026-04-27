import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "./assets/tailwind.css";
import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";



function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />

      <Route path="/400" element={<ErrorPage code="400" message="Bad Request" />} />
      <Route path="/401" element={<ErrorPage code="401" message="Unauthorized" />} />
      <Route path="/403" element={<ErrorPage code="403" message="Forbidden" />} />

      <Route path="*" element={<ErrorPage code="404" message="It's look like you're lost" />} />
    </Route>
      <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/forgot" element={<Forgot/>} />
          </Route>
    </Routes>
    
  );
}

export default App;