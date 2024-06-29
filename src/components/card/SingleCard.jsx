
import icon from '@/assets/images/home/icon1.png'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const SingleCard = ({ item }) => {
    return (
        <div className="md:w-[340px] md:h-[185px] w-[216px] h-[121px] relative  mt-12 bottom-0 shadow-lg">
            <div className="h-full w-full">
                <div className="md:w-[345px] md:h-[185px] w-[216px] h-[121px] bg-white">
                    <img
                        src={icon}
                        alt=""
                        className="absolute top-[-50%] right-5 transform translate-y-[175%] h-7 w-7 md:h-11 md:w-11"
                    />
                    <div className="grid grid-cols-3 p-3">
                        <div className="md:w-[100px] md:h-[94px] w-[67px] h-[60px]">
                            {' '}
                            <img
                                src={item.image}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                        <div className="col-span-2 p-2">
                            <Link to={`/redeem-deal`}>
                                <div className="md:text-base text-sm text-black-500 font-bold">
                                    {item.title}
                                </div>
                            </Link>
                            <div className="md:text-sm text-gray-400 text-[10px]">
                                {item.body}
                            </div>
                        </div>
                        <div className="flex  items-center md:h-20 h-8 w-full justify-start px-1">
                            <div className="flex">
                                <Icon
                                    icon="heroicons:star-solid"
                                    className="text-yellow-500 md:text-xl text-[12px]"
                                />
                                <p className="text-[12px] font-semibold md:text-base ml-2">
                                    {item.rating}
                                </p>
                            </div>
                        </div>
                        <div className="flex  items-center md:h-20 h-8 w-full justify-start  col-span-2 text-[12px] md:text-base text-gray-400">
                            {item.reviews} reviews
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;
