import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/register'));
const EditProfile = lazy(() => import('./pages/user/editProfile'));
const DeleteUserProfilePage = lazy(() =>
    import('./pages/user/deleteUserProfile')
);
const ScanQRPage = lazy(() => import('./pages/scanQR'));
const AnalyticsPage = lazy(() => import('./pages/analytics'));
const VouchersPage = lazy(() => import('./pages/vouchers'));
const StorePage = lazy(() => import('./pages/stores'));

const CreateVouchersPage = lazy(() => import('./pages/vouchers/create-vouchers'));
const CreateStorePage = lazy(() => import('./pages/stores/create-store')); 
const PaymentPage = lazy(() => import('./pages/payment')); 
const Error = lazy(() => import('./pages/404')); 
const AdminUsersPage = lazy(() => import('./pages/adminUsers')); 
const CreateAdminForm = lazy(() => import('./pages/adminUsers/CreateAdminForm'));  
const SuccessPage = lazy(() => import('./pages/success')); 
const UnauthorizedPage = lazy(() => import('./pages/unauthorized'));
const Home = lazy(()=>import('./pages/home'))
const Merchant = lazy(()=>import('./pages/merchant'))
const ClippedDeals = lazy(()=>import('./pages/clippedDeals'))
const RedeemDeal = lazy(()=>import('./pages/redeemDeal'))
const RedeemDealDetails = lazy(()=>import('./pages/redeemDealDetails'))

import RequireAuth from './components/RequireAuth';
import { ROLES } from './constant/userRoles';
import AuthLayout from './layout/AuthLayout';
import Layout from './layout/Layout';
//import Home from '@/pages/home/Home';


function App() {
    return (
        <main className="App  relative">
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/merchant" element={<Merchant/>}/>
                    <Route path="/clippedDeals" element={<ClippedDeals/>}/>
                    <Route path="/redeemDeal" element={<RedeemDeal/>}/>
                    <Route path="/redeemDealDetails" element={<RedeemDealDetails/>}/>
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.SUPER_ADMIN,
                                    ROLES.CONSUMER,
                                    ROLES.MERCHANT,
                                ]}
                            />
                        }
                    >
                        <Route
                            path="profile/user/edit/:id"
                            element={<EditProfile />}
                        />
                        <Route path="vouchers" element={<VouchersPage />} />
                        <Route path="stores" element={<StorePage />} />
                        <Route
                            path="vouchers/create-vouchers"
                            element={<CreateVouchersPage />}
                        />
                        <Route
                            path="stores/create-store"
                            element={<CreateStorePage />}
                        />
                        <Route path="payment" element={<PaymentPage />} />
                        <Route path="success" element={<SuccessPage />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    ROLES.SUPER_ADMIN,
                                    ROLES.CONSUMER,
                                    ROLES.MERCHANT,
                                ]}
                            />
                        }
                    >
                        <Route
                            path="profile/user/edit/:id"
                            element={<EditProfile />}
                        />
                        <Route
                            path="delete-account"
                            element={<DeleteUserProfilePage />}
                        />
                        <Route path="scan-qr" element={<ScanQRPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="admins" element={<AdminUsersPage />} />
                        <Route
                            path="admins/create-admin"
                            element={<CreateAdminForm />}
                        />
                    </Route>

                    <Route path="unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App;
