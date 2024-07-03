import { Link } from 'react-router-dom';
import logo from './../../assets/images/home/Group 1000005441.png';
function SingleVoucher({ item, link = 'redeem-deal-details' }) {
    console.log("🚀  ~ item:", item)
    return (
        <div className="lg:h-44 lg:w-[490px] h-[110px] w-[220px] bg-white shadow-lg sm:w-[270px] sm:h-[120px] md:h-[150px] md:w-[330px]">
            <div className="w-full h-full relative">
                {/* Right side circle */}
                <div className="lg:h-8 h-3 lg:w-8 w-3 rounded-full bg-[#f9f9f9]  absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 overflow-hidden "></div>
                {/* Left side circle */}
                <div className="lg:h-8 h-3 lg:w-8 w-3  rounded-full bg-[#f9f9f9]  absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 overflow-hidden"></div>
                <div className="flex flex-1 items-center px-4 h-full">
                    <div className=" p-4 border-r-4 w-full border border-t-0 border-l-0 border-b-0 border-dotted mr-4">
                        <div className="font-bold text-xs lg:text-sm">
                            <Link to={`/${link}/${item?._id}`}>
                                {item?.storeName}
                            </Link>
                        </div>
                        <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-[14px]">
                            {item?.condition}
                        </div>
                        <div className="flex justify-between px-0 md:px-0 md:mt-4 mt-2 items-center">
                            <div className="md:text-sm text-[9px] sm:text-[11px] font-semibold text-orange-600 lg:text-[16px]">
                                {item?.discount}% off
                            </div>
                            <div className="md:h-8 md:w-8 sm:h-5 sm:w-5 h-4 w-4 flex items-center  rounded-full lg:h-10 lg:w-10">
                                <Link to={`/${link}/${item?._id}`}>
                                    <img
                                        src={logo}
                                        className="h-full w-full rounded-full"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-80 lg:h-36 sm:h-24 sm:w-52 h-20 w-44  my-auto lg:p-2">
                        <Link to={`/${link}/${item?._id}`}>
                            <img
                                src={item?.image}
                                alt=""
                                className="h-full w-full"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleVoucher;
