import Loading from '@/components/Loading';
import DesktopMenu from '@/components/navs/DesktopMenu';
import MobileMenuUser from '@/components/navs/MobileMenuUser';
import Language from '@/components/partials/header/Tools/Language';
import Notification from '@/components/partials/header/Tools/Notification';
import Profile from '@/components/partials/header/Tools/Profile';
import Button from '@/components/ui/Button';
import useCurrentWidth from '@/hooks/useCurrentWidth';
import useWidth from '@/hooks/useWidth';
import { selectCurrentUser, setUser } from '@/store/api/auth/authSlice';
import { getUser } from '@/store/api/user/userSlice';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from './../assets/images/home/Thymbol Logo.png';

function UserLayout() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [sidebar, setSidebar] = useState(false);
    const currentWidth = useCurrentWidth();

    const { width, breakpoints } = useWidth();
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    const dispatch = useDispatch();

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
                        SubscriptionType: auth.SubscriptionType
                    })
                );
                dispatch(getUser({ user_id: auth.user_id }));
            }
        }
    }, [dispatch]);

    return (
        <>
            <div className="bg-blue-400 relative">
                <span onClick={() => setSidebar(!sidebar)}>
                    <Icon
                        className="absolute top-[50%] -translate-y-[50%] text-white text-2xl cursor-pointer left-5 lg:hidden"
                        icon={`heroicons:${
                            sidebar ? 'x-mark' : 'bars-3-bottom-left'
                        }`}
                    />
                </span>
                <nav className="px-6 md:px-12 mx-auto flex items-center justify-between md:h-24 ">
                    <div className="flex-1 flex justify-center md:justify-start mx-auto md:mx-0">
                        <Link to="/home">
                            <div className="h-16 w-24 cursor-pointer">
                                <img src={logo} className="h-full w-full" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex-1 flex">
                        <DesktopMenu
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                        {currentWidth <= 1024 && (
                            <MobileMenuUser
                                sidebar={sidebar}
                                setSidebar={setSidebar}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        )}
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
                            <Language />
                        </div>

                        {user ? (
                            <>
                                <div className="nav-tools px-5 flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
                                    {width >= breakpoints.md && (
                                        <Notification />
                                    )}
                                </div>
                                <Profile />
                            </>
                        ) : (
                            <>
                                <Button
                                    className="bg-white text-black mx-4"
                                    link={'/login-consumer'}
                                    text={'Login as consumer'}
                                />
                                <Button
                                    className="bg-white text-black"
                                    link={'/login'}
                                    text={'Login as Business'}
                                />
                            </>
                        )}
                    </div>
                </nav>
            </div>
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
                    <Outlet />
                </motion.div>
            </Suspense>
        </>
    );
}

export default UserLayout;
