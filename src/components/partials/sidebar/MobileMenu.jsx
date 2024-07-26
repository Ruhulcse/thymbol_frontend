import LogoutLogo from '@/assets/images/auth/logout_logo.svg';
import Icon from '@/components/ui/Icon';
import { menuItems } from '@/constant/data';
import useDarkMode from '@/hooks/useDarkMode';
import useMobileMenu from '@/hooks/useMobileMenu';
import useSemiDark from '@/hooks/useSemiDark';
import useSkin from '@/hooks/useSkin';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Navmenu from './Navmenu';

// import images
import MobileLogoWhite from '@/assets/images/logo/logo-c-white.png';
import MobileLogo from '@/assets/images/logo/logo-c.png';
import Icons from '@/components/ui/Icon';
import { logOut } from '@/store/api/auth/authSlice';
import { swalConfirm } from '@/util/helpers';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const MobileMenu = ({ className = 'custom-class' }) => {
    const scrollableNodeRef = useRef();
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleScroll = () => {
            if (scrollableNodeRef.current.scrollTop > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        scrollableNodeRef.current.addEventListener('scroll', handleScroll);
    }, [scrollableNodeRef]);

    const [isSemiDark] = useSemiDark();
    // skin
    const [skin] = useSkin();
    const [isDark] = useDarkMode();
    const [mobileMenu, setMobileMenu] = useMobileMenu();

    const confirmLogout = async () => {
        setMobileMenu(false);
        const response = await swalConfirm(
            t('Are you sure you want to Logout?'),
            t('Logout'),
            t('Yes'),
            t('No'),
            LogoutLogo
        );

        if (response.isConfirmed) {
            handleLogout();
        }
    };

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/home');
    };

    return (
        <div
            className={`${className} fixed  top-0 bg-white dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
        >
            <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
                <Link to="/dashboard">
                    <div className="flex items-center space-x-4">
                        <div className="logo-icon">
                            {!isDark && !isSemiDark ? (
                                <img src={MobileLogo} alt="" />
                            ) : (
                                <img src={MobileLogoWhite} alt="" />
                            )}
                        </div>
                        {/* <div>
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                THYMBOL
                            </h1>
                        </div> */}
                    </div>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                >
                    <Icon icon="heroicons:x-mark" />
                </button>
            </div>

            <div
                className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
                    scroll ? ' opacity-100' : ' opacity-0'
                }`}
            ></div>
            <SimpleBar
                className="sidebar-menu px-4 h-[calc(100%-80px)]"
                scrollableNodeProps={{ ref: scrollableNodeRef }}
            >
                <Navmenu menus={menuItems} />

                <div className="single-sidebar-menu my-3">
                    <div className="menu-link">
                        <div className="flex-1 flex items-start">
                            <span className="menu-icon">
                                <Icons icon={'heroicons-outline:login'} />
                            </span>
                            <div className="text-box" onClick={confirmLogout}>
                                {t('Logout')}
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleBar>
        </div>
    );
};

export default MobileMenu;
