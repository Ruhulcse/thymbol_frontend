import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function SalonsCard({ item }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full h-auto">
            <div className="flex justify-center mb-4">
                <div className="h-20 w-20 md:h-32 md:w-32 rounded-full overflow-hidden">
                    <img
                        src={item?.logo?.filePath || 'https://cdn-icons-png.flaticon.com/512/2474/2474161.png'}
                        alt={`${item?.store_name} logo`}
                        className="h-full w-full object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="text-center">
                <Link to={`/store/${item._id}`}>
                    <div className="font-bold text-[12px] md:text-base text-left">
                        {item?.store_name}
                    </div>
                </Link>
                <div className="text-[9px] md:text-sm mt-2">{item.body}</div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="text-[13px] md:text-base font-semibold text-orange-600">
                    {item?.sellOff} off
                </div>
                <Link to={`/store/${item._id}`}>
                    <div className="h-6 w-6 md:h-8 md:w-8 bg-customOrange rounded-full flex items-center justify-center">
                        <Icon
                            icon="heroicons:arrow-right"
                            className="text-white font-bold"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SalonsCard;
