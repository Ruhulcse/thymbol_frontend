import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/register'));
const RegisterConsumer = lazy(() => import('./pages/auth/register-consumer'));
const GoogleLogInSuccess = lazy(() => import('./pages/auth/success'));
const EditProfile = lazy(() => import('./pages/user/editProfile'));
const DeleteUserProfilePage = lazy(() =>
    import('./pages/user/deleteUserProfile')
);
const ScanQRPage = lazy(() => import('./pages/scanQR'));
const AnalyticsPage = lazy(() => import('./pages/analytics'));
const VouchersPage = lazy(() => import('./pages/vouchers'));
const StorePage = lazy(() => import('./pages/stores'));

const CreateVouchersPage = lazy(() =>
    import('./pages/vouchers/create-vouchers')
);
const CreateStorePage = lazy(() => import('./pages/stores/create-store'));
const PaymentPage = lazy(() => import('./pages/payment'));
const Error = lazy(() => import('./pages/404'));
const AdminUsersPage = lazy(() => import('./pages/adminUsers'));
const CreateAdminForm = lazy(() =>
    import('./pages/adminUsers/CreateAdminForm')
);
const SuccessPage = lazy(() => import('./pages/success'));
const UnauthorizedPage = lazy(() => import('./pages/unauthorized'));
const Home = lazy(() => import('./pages/home'));
const Merchant = lazy(() => import('./pages/merchant'));
const ClippedDeals = lazy(() => import('./pages/clippedDeals'));
const RedeemDeal = lazy(() => import('./pages/redeemDeal'));
const RedeemDealDetails = lazy(() => import('./pages/redeemDealDetails'));
const PushNotificationPage = lazy(() => import('./pages/pushNotification'));
const VerificationVideo = lazy(() => import('./components/verificationVideo'));
const VideoReviewPage = lazy(() => import('./pages/videoReview'));
const LoginHomePage = lazy(() => import('./pages/loginHome'));
const LoginConsumer = lazy(() => import('./pages/auth/login-consumer'));
const ConsumerSubscriptionPage = lazy(() =>
    import('./pages/consumerSubscription')
);

import { useDispatch } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import { ROLES } from './constant/userRoles';
import AuthLayout from './layout/AuthLayout';
import Layout from './layout/Layout';
import UserLayout from './layout/UserLayout';
import { getUserGeoLocation } from './store/api/GeoLocation/geoLocationSlice';
//import Home from '@/pages/home/Home';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserGeoLocation());
    }, [dispatch]);

    return (
        <main className="App  relative">
            <Routes>
                {/* public routes */}
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/" element={<LoginHomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-consumer" element={<LoginConsumer />} />
                    <Route path="/signup-consumer" element={<RegisterConsumer />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="*" element={<Error />} />
                </Route>

                {/* consumer layout */}
                <Route path="/" element={<UserLayout />}>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES.CONSUMER]} />
                        }
                    >
                        <Route path="/home" element={<Home />} />
                        <Route path="/store/:id" element={<Merchant />} />

                        <Route
                            path="/clipped-deals"
                            element={<ClippedDeals />}
                        />
                        <Route path="/redeem-deal" element={<RedeemDeal />} />
                        <Route
                            path="/redeem-deal-details"
                            element={<RedeemDealDetails />}
                        />
                        <Route
                            path="/verification-intro"
                            element={<VerificationVideo />}
                        />
                        <Route
                            path="/consumer-subscription"
                            element={<ConsumerSubscriptionPage />}
                        />
                        <Route
                            path="/add-video-review"
                            element={<VideoReviewPage />}
                        />
                    </Route>
                </Route>

                {/* admin layout */}
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
                        <Route
                            path="push-notifications"
                            element={<PushNotificationPage />}
                        />
                    </Route>

                    <Route path="unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="auth/success" element={<GoogleLogInSuccess />}>
                    {' '}
                </Route>
            </Routes>
        </main>
    );
}

export default App;
