
import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { voucherData } from '@/data/voucherData';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import icon from '@/assets/images/icon/Icons.png';

function RedeemDeal() {
    return (
        <div className="bg-[#fdffff] min-h-screen h-full flex justify-center">
            <div className="flex items-center justify-center">
                <div className="bg-[#fafafa] p-6 rounded-md shadow-md">
                    <SingleVoucher item={voucherData[0]} />
                    <div className="text-center mt-4 space-y-4">
                        <div className="font-bold text-sm sm:text-base md:text-xl">
                            Thymbol Exclusive Deal
                        </div>
                        <div className="font-semibold text-sm sm:text-base">
                            All deals will expire after 1 hour
                        </div>
                    </div>
                    <div className="flex justify-around text-xs sm:text-base mt-4 py-1 my-1">
                        <Link to={`/clipped-deals`}>
                            <button className="bg-customBlue text-white px-3 py-4 rounded-md flex my-auto items-center ">
                                <span className="mx-1">
                                    <Icon icon="heroicons:bookmark" />
                                </span>
                                Clip for later
                            </button>
                        </Link>
                        <Link to={`/redeem-deal-details`}>
                            <button className="bg-customBlue text-white px-3 py-4 rounded-md flex items-center">
                                {' '}
                                <span className="mx-1 h-4 w-4">
                                    <img
                                        src={icon}
                                        alt=""
                                        className="h-full w-full z-10"
                                    />
                                </span>
                                Redeem Deal
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RedeemDeal;
