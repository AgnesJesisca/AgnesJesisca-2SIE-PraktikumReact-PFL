import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MemberLayout from "./layouts/MemberLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"));
const Products = React.lazy(() => import("./pages/main/Products"));
const Components = React.lazy(() => import("./pages/main/Components"));
const FiturXyz = React.lazy(() => import("./pages/main/FiturXyz"));
const Note = React.lazy(() => import("./pages/main/Note"));

// Member pages
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
const MyOrders = React.lazy(() => import("./pages/member/MyOrders"));
const Checkout = React.lazy(() => import("./pages/member/Checkout"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Admin Routes - wrapped in MainLayout, protected for admin role */}
        <Route element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/fiturxyz" element={<FiturXyz />} />
          <Route path="/notes" element={<Note />} />

          <Route path="/400" element={<ErrorPage code="400" message="Bad Request" />} />
          <Route path="/401" element={<ErrorPage code="401" message="Unauthorized" />} />
          <Route path="/403" element={<ErrorPage code="403" message="Forbidden" />} />
          <Route path="*" element={<ErrorPage code="404" message="It's look like you're lost" />} />
        </Route>

        {/* Member Routes - wrapped in MemberLayout, protected for member role */}
        <Route element={
          <ProtectedRoute allowedRoles={['member']}>
            <MemberLayout />
          </ProtectedRoute>
        }>
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/orders" element={<MyOrders />} />
          <Route path="/member/checkout" element={<Checkout />} />
        </Route>

        {/* Auth Routes - wrapped in AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
