
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/register'));
const EditProfile = lazy(() => import('./pages/user/editProfile'));
const DeleteUserProfilePage = lazy(() => import('./pages/user/deleteUserProfile'));
const ScanQRPage = lazy(() => import('./pages/scanQR'));
const AnalyticsPage = lazy(() => import('./pages/analytics'));
const VouchersPage = lazy(() => import('./pages/vouchers'));
const StorePage = lazy(() => import('./pages/stores'));
const CreateVouchersPage = lazy(() => import('./pages/vouchers/create-vouchers'));
const CreateStorePage = lazy(() => import('./pages/stores/create-store')); 
const PaymentPage = lazy(() => import('./pages/payment')); 
const Error = lazy(() => import('./pages/404')); 

import AuthLayout from './layout/AuthLayout';
import Layout from './layout/Layout';


function App() {
   
    return (
        <main className="App  relative">
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile/user/edit/:id" element={<EditProfile />} />
                    <Route path="delete-account" element={<DeleteUserProfilePage />} />
                    <Route path="scan-qr" element={<ScanQRPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="vouchers" element={<VouchersPage />} />
                    <Route path="stores" element={<StorePage />} />
                    <Route path="create-vouchers" element={<CreateVouchersPage />} />
                    <Route path="create-store" element={<CreateStorePage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="" element={<Error />} />
                </Route>
            </Routes>
        </main>
    );

}

export default App;
