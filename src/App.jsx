import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import './App.css';

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
const FavoriteStores = lazy(() => import('./pages/favoriteStores'));

const CreateVouchersPage = lazy(() =>
	import('./pages/vouchers/create-vouchers')
);
const CreateStorePage = lazy(() => import('./pages/stores/create-store'));
const CreatePushNotificationPage = lazy(() =>
	import('./pages/pushNotification/create-push-notification')
);
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
const LoginConsumer = lazy(() => import('./pages/auth/login-consumer'));
const ConsumerPaymentPage = lazy(() => import('./pages/consumer-payment'));
const NotificationPage = lazy(() => import('./pages/notification'));
const ConsumerSubscriptionPage = lazy(() =>
	import('./pages/consumerSubscription')
);

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import { ROLES } from './constant/userRoles';
import AuthLayout from './layout/AuthLayout';
import Layout from './layout/Layout';
import UserLayout from './layout/UserLayout';
import { initializeMetaPixel } from './metaPixel';
import { setUser } from './store/api/auth/authSlice';
import { getUserGeoLocation } from './store/api/GeoLocation/geoLocationSlice';
import { getUser } from './store/api/user/userSlice';
import { handleRtl } from './store/layout';
// just a testing import Home from '@/pages/home/Home';

import 'react-responsive-modal/styles.css';
import About from './pages/about/About';
import Faq from './pages/faq/Faq';
import Privacy from './pages/PrivacyPolicy/Privacy';

function App() {
	const { i18n } = useTranslation();
	document.body.dir = i18n.dir();
	const dispatch = useDispatch();
	const savedLanguage = useSelector((state) => state.layout.language);

	useEffect(() => {
		dispatch(getUserGeoLocation());
	}, [dispatch]);

	useEffect(() => {
		initializeMetaPixel();
	}, []);

	useEffect(() => {
		const localAuth = localStorage?.getItem('auth');
		if (localAuth) {
			const auth = JSON.parse(localAuth);
			if (auth?.accessToken) {
				dispatch(
					setUser({
						token: auth.accessToken,
						user_id: auth.user_id,
						isLoggedIn: true,
						userType: auth.userType,
						SubscriptionType: auth.SubscriptionType,
					})
				);
				dispatch(getUser({ user_id: auth.user_id }));
			}
		}
	}, [dispatch]);

	useEffect(() => {
		if (savedLanguage === 'ar') {
			dispatch(handleRtl(true));
		} else {
			dispatch(handleRtl(false));
		}
		i18n.changeLanguage(savedLanguage);
	}, [savedLanguage, dispatch]);

	return (
		<main className="App  relative">
			<Routes>
				{/* public routes */}
				<Route path="/" element={<AuthLayout />}>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/login-consumer" element={<LoginConsumer />} />
					<Route path="/signup-consumer" element={<RegisterConsumer />} />
					<Route path="/signup" element={<Signup />} />

					<Route path="*" element={<Error />} />
				</Route>

				{/* consumer layout */}
				<Route path="/" element={<UserLayout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/faq" element={<Faq />} />
					<Route path="/privacy-policy" element={<Privacy />} />
					<Route path="/store/:id" element={<Merchant />} />

					<Route path="/redeem-deal/:id" element={<RedeemDeal />} />
					<Route
						path="/redeem-deal-details/:id"
						element={<RedeemDealDetails />}
					/>
					<Route path="success" element={<SuccessPage />} />

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
						<Route path="/verification-intro" element={<VerificationVideo />} />
						<Route path="/notifications" element={<NotificationPage />} />
						<Route path="/add-video-review" element={<VideoReviewPage />} />
						<Route
							path="/consumer-subscription"
							element={<ConsumerSubscriptionPage />}
						/>
						<Route
							path="/consumer-payment/:type"
							element={<ConsumerPaymentPage />}
						/>
						<Route path="/clipped-deals" element={<ClippedDeals />} />
						<Route path="/favourites" element={<FavoriteStores />} />
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
						<Route path="profile/user/edit/:id" element={<EditProfile />} />
					</Route>

					<Route
						element={
							<RequireAuth
								allowedRoles={[
									ROLES.ADMIN,
									ROLES.SUPER_ADMIN,
									// ROLES.CONSUMER,
									ROLES.MERCHANT,
								]}
							/>
						}
					>
						<Route path="vouchers" element={<VouchersPage />} />
						<Route path="stores" element={<StorePage />} />
						<Route
							path="vouchers/create-vouchers"
							element={<CreateVouchersPage />}
						/>
						<Route
							path="push-notifications/create-push-notification"
							element={<CreatePushNotificationPage />}
						/>
						<Route path="stores/create-store" element={<CreateStorePage />} />
						<Route path="dashboard/payment" element={<PaymentPage />} />
						<Route path="success" element={<SuccessPage />} />
					</Route>

					<Route
						element={
							<RequireAuth
								allowedRoles={[
									ROLES.SUPER_ADMIN,
									// ROLES.CONSUMER,
									ROLES.MERCHANT,
								]}
							/>
						}
					>
						<Route path="profile/user/edit/:id" element={<EditProfile />} />
						<Route path="delete-account" element={<DeleteUserProfilePage />} />
						<Route path="scan-qr" element={<ScanQRPage />} />
						<Route path="analytics" element={<AnalyticsPage />} />
						<Route path="admins" element={<AdminUsersPage />} />
						<Route path="admins/create-admin" element={<CreateAdminForm />} />
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
