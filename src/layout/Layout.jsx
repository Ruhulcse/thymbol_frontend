import Footer from '@/components/partials/footer';
import MobileFooter from '@/components/partials/footer/MobileFooter';
import Header from '@/components/partials/header';
import Sidebar from '@/components/partials/sidebar';
import useContentWidth from '@/hooks/useContentWidth';
import useMenuHidden from '@/hooks/useMenuHidden';
import useMenulayout from '@/hooks/useMenulayout';
import useMobileMenu from '@/hooks/useMobileMenu';
import useSidebar from '@/hooks/useSidebar';
import useWidth from '@/hooks/useWidth';
import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from '../components/partials/sidebar/MobileMenu';

import Loading from '@/components/Loading';
import { selectCurrentToken, setUser } from '@/store/api/auth/authSlice';
import { getUser } from '@/store/api/user/userSlice';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
const Layout = () => {
    const { width, breakpoints } = useWidth();
    const [collapsed] = useSidebar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const switchHeaderClass = () => {
        if (menuType === 'horizontal' || menuHidden) {
            return 'ltr:ml-0 rtl:mr-0';
        } else if (collapsed) {
            return 'ltr:ml-[72px] rtl:mr-[72px]';
        } else {
            return 'ltr:ml-[248px] rtl:mr-[248px]';
        }
    };
    // content width
    const [contentWidth] = useContentWidth();
    const [menuType] = useMenulayout();
    const [menuHidden] = useMenuHidden();
    // mobile menu option
    const [mobileMenu, setMobileMenu] = useMobileMenu();
    const nodeRef = useRef(null);
    const token = useSelector(selectCurrentToken);

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
                    })
                );
                dispatch(getUser({ user_id: auth.user_id }));
            }
        }
    }, [dispatch]);

    return (
        <>
            <Header
                className={width > breakpoints.xl ? switchHeaderClass() : ''}
            />
            {menuType === 'vertical' &&
                width > breakpoints.xl &&
                !menuHidden && <Sidebar />}

            <MobileMenu
                className={`${
                    width < breakpoints.xl && mobileMenu
                        ? 'left-0 visible opacity-100  z-[9999]'
                        : 'left-[-300px] invisible opacity-0  z-[-999] '
                }`}
            />
            {/* mobile menu overlay*/}
            {width < breakpoints.xl && mobileMenu && (
                <div
                    className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
                    onClick={() => setMobileMenu(false)}
                ></div>
            )}
            {/* <Settings /> */}
            <div
                className={`content-wrapper transition-all duration-150 ${
                    width > 1280 ? switchHeaderClass() : ''
                }`}
            >
                {/* md:min-h-screen will h-full*/}
                <div className="page-content   page-min-height  ">
                    <div
                        className={
                            contentWidth === 'boxed'
                                ? 'container mx-auto'
                                : 'container-fluid'
                        }
                    >
                        <Suspense fallback={<Loading />}>
                            <motion.div
                                key={location.pathname}
                                initial="pageInitial"
                                animate="pageAnimate"
                                exit="pageExit"
                                variants={{
                                    pageInitial: {
                                        opacity: 0,
                                        y: 50,
                                    },
                                    pageAnimate: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                    pageExit: {
                                        opacity: 0,
                                        y: -50,
                                    },
                                }}
                                transition={{
                                    type: 'tween',
                                    ease: 'easeInOut',
                                    duration: 0.5,
                                }}
                            >
                                {/* <Breadcrumbs /> */}
                                <Outlet />
                            </motion.div>
                        </Suspense>
                    </div>
                </div>
            </div>
            {width < breakpoints.md && <MobileFooter />}
            {width > breakpoints.md && (
                <Footer
                    className={
                        width > breakpoints.xl ? switchHeaderClass() : ''
                    }
                />
            )}
        </>
    );
};

export default Layout;
