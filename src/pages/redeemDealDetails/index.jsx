import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { voucherData } from '@/data/voucherData';

import Button from '@/components/button/Button';
import UserLayout from '@/layout/UserLayout';
import qr from '@/assets/images/merchant/qr.png';
import map from '@/assets/images/merchant/map.png';
function RedeemDealDetails() {
    return (
        <>
            <UserLayout />
            <div className="bg-[#F3FCFF] ">
                <div className="container mx-auto min-h-screen h-full flex flex-1 gap-10">
                    <div className="flex flex-col flex-1 space-y-10">
                        <div className="md:flex justify-between mx-6 hidden">
                            <Button icon="arrow-long-left">Back</Button>
                            <div className="bg-gray-200 p-2">
                                Remaining Vouchers: 27h
                            </div>
                        </div>
                        <div className="font-bold text-xl text-black-500 mt-8">
                            Your Redeemed Deal’s Details
                        </div>
                        <div className="flex justify-center ">
                            <SingleVoucher item={voucherData[0]} />
                        </div>
                        <div className="flex  md:gap-10  gap-5 lg:text-xl md:text-sm text-xs justify-center font-semibold">
                            <div className="bg-white px-3  w-44 py-2">
                                Redeem Date: April 24,2024
                            </div>
                            <div className="bg-white px-3  w-44 py-2">
                                Valid Till: 60 minutes
                            </div>
                        </div>
                        <div className="font-bold text-xl">Location</div>
                        <div className="flex gap-7">
                            <div className="h-52 w-72">
                                <img
                                    src={map}
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="h-40 w-40">
                                <img
                                    src={qr}
                                    alt=""
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                        <div className="bg-gray-200 p-2 md:hidden w-[50%]">
                            Remaining Vouchers: 27h
                        </div>
                    </div>
                    <div className="space-y-10 hidden md:block mt-10">
                        <div className="xl:w-[520px]  bg-white lg:h-364px  min-w-[300px] min-h-[250px] flex flex-col text-center justify-center items-center space-y-4 ">
                            <div className="font-bold">4 Redemptions Left</div>
                            <div className="px-4">
                                4 Redemptions left as a free user, upgrade to
                                premium package to enjoy more
                            </div>
                            <div>
                                <Button className="">
                                    Upgrade Now
                                </Button>
                            </div>
                        </div>
                        <div className="xl:w-[520px]  bg-white xl:h-364px  min-w-[300px] min-h-[250px]  flex flex-col text-center justify-center items-center space-y-4">
                            <div className="font-bold">Rate the deal</div>
                            <div>
                                Please upload or record your video review.
                            </div>
                            <div className="flex justify-between gap-6">
                                <div>
                                    <Button
                                        icon="cloud-arrow-up"
                                        className=""
                                    >
                                        Upload a video
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        icon="video-camera"
                                        className=""
                                    >
                                        Record a video
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RedeemDealDetails;
