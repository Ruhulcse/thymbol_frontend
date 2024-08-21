import LogoutLogo from '@/assets/images/auth/logout_logo.svg';
import { food } from '@/assets/images/home';
import { navLink } from '@/constant/data';
import { logOut } from '@/store/api/auth/authSlice';
import { swalConfirm } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MobileMenuUser({ sidebar, setSidebar, activeIndex, setActiveIndex }) {
    console.log('🚀  ~ sidebar:', sidebar);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Detect if the layout is RTL
    const isRTL = i18n.dir() === 'rtl';

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/home');
    };

    const confirmLogout = async () => {
        setSidebar(false);
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

    return (
        <div
            className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} flex flex-col bg-white z-[100] rounded-lg shadow-lg w-64 h-screen ${
                sidebar ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}
        >
            <Icon
                className="absolute top-2 right-2 text-black-500 text-2xl cursor-pointer"
                icon="heroicons:x-mark"
                onClick={() => setSidebar(false)}
            />
            <div className="h-24 w-24 bg-green-500 rounded-full my-4 mx-4">
                <img src={food} className="h-full w-full object-cover" />
            </div>
            {navLink.map((item, i) => (
                <Link
                    key={i}
                    to={item.link}
                    onClick={() => {
                        setActiveIndex(i);
                        setSidebar(false);
                    }}
                    className={`px-6 rounded-md hover:text-white hover:bg-black-500 py-2 m-1 ${
                        activeIndex === i
                            ? 'bg-black-500 text-white'
                            : 'text-black-500'
                    }`}
                >
                    <span className="flex items-center">
                        <Icon icon={item.icon} className="mx-2 text-xl" />
                        {t(item.title)}
                    </span>
                </Link>
            ))}
            <Link
                to={'/'}
                className="px-6 hover:text-white hover:bg-black-500 rounded-md py-2 m-1 text-black-500"
            >
                <span className="flex items-center">
                    <Icon icon="heroicons:user" className="mx-2 text-xl" />
                    Profile
                </span>
            </Link>
            <div
                onClick={confirmLogout}
                className="px-6 hover:text-white hover:bg-black-500 rounded-md py-2 m-1 text-black-500"
            >
                <span className="flex items-center">
                    <Icon
                        icon="heroicons:arrow-right-start-on-rectangle"
                        className="mx-2 text-xl"
                    />
                    Log Out
                </span>
            </div>
        </div>
    );
}

export default MobileMenuUser;
