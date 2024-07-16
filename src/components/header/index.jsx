import { cover, morocco, soudia, topBarImage, uae } from '@/assets/images/home';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const data = [
    {
        name: 'Morocco',
        image: morocco,
    },
    {
        name: 'Saudi Arabia',
        image: soudia,
    },
    {
        name: 'UAE',
        image: uae,
    },
];

function Header() {
    const { t } = useTranslation();
    return (
        <>
            <div className="container mx-auto">
                <div className="  md:flex justify-between ">
                    <div className="max-w-lg sm:h-80 font-bold ">
                        <div className=" text-2xl hidden sm:block mb-2">
                            <span className="text-customBlue">Thymbol </span> <span>Your World of Deals!</span>
                        </div>
                        {/* <p className="hidden sm:block py-4">
                            
                        </p> */}
                        <p className="hidden sm:block py-4">{t('Serving')}:</p>
                        <span className=" gap-2 hidden sm:flex">
                            {data.map((item, i) => (
                                <span
                                    key={i}
                                    className="flex gap-1 items-center"
                                >
                                    <img src={item.image} />
                                    {t(item.name)}
                                </span>
                            ))}
                        </span>
                        <div className="sm:mt-10 flex space-x-4 font-normal mt-[-81px] sm:justify-start justify-center ">
                            <div className="flex relative w-[60%] ">
                                <input
                                    type="text"
                                    placeholder={t("Search Location")}
                                    className="w-full sm:h-16 h-12 shadow-lg px-4 rounded-lg z-[50]  focus:outline-none"
                                />
                                <div className="absolute  top-[50%] -translate-y-[50%] right-0 font-bold pr-2 text-xl text-blue-500 z-[60]">
                                    <Icon
                                        className=""
                                        icon={
                                            'heroicons:adjustments-horizontal'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="bg-white shadow-lg h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center text-2xl text-blue-500 rounded-lg z-[60] cursor-pointer">
                                <Icon icon={'heroicons:magnifying-glass'} />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-lg h-80 hidden sm:block">
                        <img
                            src={topBarImage}
                            alt=""
                            className="h-full w-full"
                        />
                    </div>
                </div>
            </div>
            {/* cover Image */}
            <div className="w-full mt-24 h-56 hidden sm:block">
                <img src={cover} className="w-full h-full" alt="" />
            </div>
        </>
    );
}

export default Header;
