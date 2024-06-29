import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { voucherData } from '@/data/voucherData';

import Button from '@/components/button/Button';
import { useNavigate, useNavigation } from 'react-router-dom';
import qr from './../../assets/images/merchant/Group.png';
import map from './../../assets/images/merchant/Screenshot 2024-04-27 at 11.38 1.png';
function RedeemDealDetails() {
    const navigate = useNavigate();

    const routerBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="bg-[#F3FCFF] py-10">
                <div className="container mx-auto min-h-screen h-full flex flex-1 gap-10">
                    <div className="flex flex-col flex-1 space-y-10">
                        <div className="md:flex justify-between  hidden">
                            <Button
                                className="py-3 px-5 bg-customBlue"
                                icon="arrow-long-left"
                                onClick={routerBack}
                            >
                                Back
                            </Button>
                            <div className="bg-[#e1f4fc] p-3 font-semibold text-black-500 rounded-md flex items-center">
                                Remaining Vouchers: 27h
                            </div>
                        </div>
                        <div className="font-bold sm:text-base md:text-xl lg:text-2xl text-black-500 mt-8">
                            Your Redeemed Deal’s Details
                        </div>
                        <div className="flex justify-start ">
                            <SingleVoucher item={voucherData[0]} />
                        </div>

                        <div className="flex md:gap-10  gap-5 lg:text-xl md:text-sm text-xs justify-around font-semibold">
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
                    <div className="space-y-10 hidden md:block">
                        <div className="xl:w-[520px]  bg-white lg:h-364px  min-w-[300px] min-h-[250px] flex flex-col text-center justify-center items-center space-y-4 py-10">
                            <div className="font-bold text-black-500 text-base md:text-2xl mb-5">
                                4 Redemptions Left
                            </div>
                            <div className="px-4 pb-10 text-black-500">
                                4 Redemptions left as a free user, upgrade to
                                premium package to enjoy more
                            </div>
                            <div className="w-5/6 ">
                                <Button className="text-[14px] text-center flex justify-center  bg-customBlue mx-4 p-3 t-5">
                                    Upgrade Now
                                </Button>
                            </div>
                        </div>
                        <div className="xl:w-[520px]  bg-white xl:h-364px  min-w-[300px] min-h-[250px]  flex flex-col text-center justify-center items-center space-y-4">
                            <div className="font-bold text-black-500 text-base md:text-2xl mb-5">
                                Rate the deal
                            </div>
                            <div>
                                Please upload or record your video review.
                            </div>
                            <div className="flex justify-between p-4">
                                <div>
                                    <Button
                                        icon="cloud-arrow-up"
                                        className="text-[14px] bg-customBlue mx-4 p-3"
                                    >
                                        Upload a video
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        icon="video-camera"
                                        className="text-[14px] bg-customBlue mx-4 p-3"
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
