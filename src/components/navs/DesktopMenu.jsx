import { navLink } from '@/constant/data';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function DesktopMenu({ activeIndex, setActiveIndex }) {
    const { t } = useTranslation();

    return (
        <div className="hidden lg:flex flex-col lg:flex-row lg:items-center bg-blue-400 w-full lg:w-[667px] h-24 rounded-lg fixed lg:relative top-0 left-0 lg:left-1/2 lg:-translate-x-1/2 lg:justify-center">
            {navLink.map((item, i) => (
                <Link
                    key={i}
                    to={item.link}
                    onClick={() => setActiveIndex(i)}
                    className={`px-6 rounded-md hover:text-black-500 hover:bg-white py-2 m-1 ${
                        activeIndex === i ? 'bg-white text-black-500' : 'text-white'
                    }`}
                >
                    <span className="flex items-center">
                        <Icon icon={item.icon} className="mx-2 text-xl" />
                        {t(item.title)}
                    </span>
                </Link>
            ))}
        </div>
    );
}

export default DesktopMenu;
