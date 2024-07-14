import { food } from '@/assets/images/home';
import Loading from '@/components/Loading';
import Profile from '@/components/partials/header/Tools/Profile';
import Button from '@/components/ui/Button';
import { navLink } from '@/constant/data';
import useCurrentWidth from '@/hooks/useCurrentWidth';
import { selectCurrentUser, setUser } from '@/store/api/auth/authSlice';
import { getUser } from '@/store/api/user/userSlice';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import logo from './../assets/images/home/Thymbol Logo.png';

function UserLayout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sidebar, setSidebar] = useState(null);
    const currentWidth = useCurrentWidth();
    const user = useSelector(selectCurrentUser);

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
                    })
                );
                dispatch(getUser({ user_id: auth.user_id }));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        setSidebar(currentWidth >= 1024 ? true : false);
    }, [currentWidth]);
    //
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
                <nav className="px-6 md:px-24 mx-auto flex justify-between items-center md:h-24 h-44 ">
                    <div className="flex-1 md:flex-none flex justify-center md:justify-start   mx-auto md:mx-0">
                        <Link to="/home">
                            <div className="h-16 w-24 cursor-pointer">
                                <img src={logo} className="h-full w-full" />
                            </div>
                        </Link>
                    </div>
                    <div
                        className={`flex absolute  lg:relative  left-0 flex-col lg:flex-row top-0 lg:bg-blue-400 bg-white  z-[100] rounded-lg shadow-lg lg:shadow-none w-64 h-screen lg:h-min lg:w-max ${
                            sidebar && '-translate-x-[0px]'
                            // : 'translate-x-[-9999px]'
                        }`}
                    >
                        <Icon
                            className="absolute top-2 right-2 text-black-500 text-2xl cursor-pointer  lg:hidden"
                            icon={`heroicons:x-mark`}
                            onClick={() => setSidebar(null)}
                        />
                        <div className="h-24 w-24 bg-green-500 rounded-full my-4 mx-4 lg:hidden">
                            <img
                                src={food}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {navLink?.map((item, i) => (
                            <Link
                                key={i}
                                to={item.link}
                                onClick={() => {
                                    setActiveIndex(i);
                                    setSidebar(null);
                                }}
                                className={` px-6 rounded-md lg:hover:text-black-500 hover:text-white hover:bg-black-500 lg:hover:bg-white py-2 m-1 ${
                                    activeIndex === i
                                        ? 'lg:bg-white text-white bg-black-500  lg:text-black-500'
                                        : 'lg:text-white'
                                } `}
                            >
                                <span className="flex items-center ">
                                    {
                                        <Icon
                                            icon={item.icon}
                                            className="mx-2 text-xl lg:hidden"
                                        />
                                    }{' '}
                                    {item.title}
                                </span>
                            </Link>
                        ))}

                        <Link
                            to={'/'}
                            className="px-6 hover:text-white hover:bg-black-500 rounded-md py-2 m-1 text-black-500 md:hidden block"
                        >
                            <span className="flex items-center">
                                <Icon
                                    icon={'heroicons:user'}
                                    className="mx-2 text-xl"
                                />
                                Profile
                            </span>
                        </Link>
                        <Link
                            to={'/'}
                            className="px-6 hover:text-white hover:bg-black-500 rounded-md py-2 m-1 text-black-500 md:hidden block"
                        >
                            <span className="flex items-center">
                                <Icon
                                    icon={
                                        'heroicons:arrow-right-start-on-rectangle'
                                    }
                                    className="mx-2 text-xl"
                                />
                                Log Out
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex">
                        {user ? (
                            <Profile />
                        ) : (
                            <>
                                <Button
                                    className="bg-white text-black me-2"
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
                    {/* <Breadcrumbs /> */}
                    <Outlet />
                </motion.div>
            </Suspense>
        </>
    );
}

export default UserLayout;
