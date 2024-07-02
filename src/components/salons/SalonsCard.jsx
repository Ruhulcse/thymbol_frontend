import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function SalonsCard({ item }) {
    return (
        <div>
            <div className="md:w-[345px] md:h-72 w-[140px] h-[185px]  bg-white">
                <div className="flex justify-center  mx-auto content-center justify-items-center py-4">
                    <div className="md:h-32 md:w-32 h-20 w-20 rounded-full">
                        <img
                            src={item?.logo?.filePath}
                            className="h-full w-full rounded-full"
                        />
                    </div>
                </div>
                <div className="text-black-500 px-4 md:px-6">
                    <Link to={`/redeem-deal`}>
                        <div className="font-bold text-[12px] md:text-base">
                            {item?.store_name}
                        </div>
                    </Link>
                    <div className="md:text-sm text-[9px]">{item.body}</div>
                </div>
                <div className="flex justify-between px-4 md:px-6 md:mt-4">
                    <div className="md:text-base text-[13px] font-semibold text-orange-600">
                        {item?.sellOff} off
                    </div>
                    <div className="md:h-8 md:w-8 h-6 w-6 rounded-full">
                        <div className="h-5 w-5 md:h-7 md:w-7 bg-customOrange rounded-full cursor-pointer flex items-center justify-center">
                            <Link to={`/redeem-deal`}>
                                <Icon
                                    icon="heroicons:arrow-right"
                                    className="text-white font-bold"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalonsCard;
