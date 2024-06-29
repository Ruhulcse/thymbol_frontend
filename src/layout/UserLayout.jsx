import Profile from '@/components/partials/header/Tools/Profile';
import { navLink } from '@/constant/data';
import useCurrentWidth from '@/hooks/useCurrentWidth';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '@/assets/images/home/ThymbolLogo.png';
function UserLayout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sidebar, setSidebar] = useState(null);
    const currentWidth = useCurrentWidth();

    useEffect(() => {
        setSidebar(currentWidth >= 1024 ? true : false);
    }, [currentWidth]);
    //console.log(sidebar);
    return (
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
                    <div className="h-16 w-24">
                        <img src={logo} className="h-full w-full" />
                    </div>
                </div>
                <div
                    className={`flex absolute  lg:relative top-36 md:top-24 left-0 flex-col lg:flex-row lg:top-0 bg-blue-400 text-red-500 z-[100] rounded-lg shadow-lg lg:shadow-none  ${
                        sidebar ? '-translate-x-[0px]' : 'translate-x-[-9999px]'
                    } transition`}
                >
                    {navLink.map((item, i) => (
                        <Link
                            key={i}
                            to={item.link}
                            onClick={() => {
                                setActiveIndex(i);
                            }}
                            className={` px-6 rounded-md hover:text-black-500 hover:bg-white py-2 m-1 ${
                                activeIndex === i
                                    ? 'bg-white text-black-500'
                                    : 'text-white'
                            } `}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <Link
                        to={'/'}
                        className={` px-6 rounded-md py-2 m-1 hover:text-black-500 hover:bg-white text-white md:hidden block`}
                    >
                        Profile
                    </Link>
                    <Link
                        to={'/'}
                        className=" px-6 hover:text-black-500 hover:bg-white rounded-md py-2 m-1 text-white md:hidden block"
                    >
                        Log Out
                    </Link>
                </div>
                <div className="hidden md:flex">
                    <Profile />
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default UserLayout;
