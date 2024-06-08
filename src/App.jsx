import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const Signup = lazy(() => import("./pages/auth/register"));
const EditProfile = lazy(() => import("./pages/user/editProfile"));
const DeleteUserProfilePage = lazy(() =>
  import("./pages/user/deleteUserProfile")
);
const ScanQRPage = lazy(() => import("./pages/scanQR"));
const AnalyticsPage = lazy(() => import("./pages/analytics"));
const VouchersPage = lazy(() => import("./pages/vouchers"));
const CreateVouchersPage = lazy(() =>
  import("./pages/vouchers/create-vouchers")
);
// import Home from "@/pages/home/Home";

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import UserLayout from "@/layout/UserLayout";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile/user/edit/:id" element={<EditProfile />} />
          <Route path="delete-account" element={<DeleteUserProfilePage />} />
          <Route path="scan-qr" element={<ScanQRPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="vouchers" element={<VouchersPage />} />
          <Route path="create-vouchers" element={<CreateVouchersPage />} />
        </Route>
        
      </Routes>
    </main>
  );
}

export default App;
