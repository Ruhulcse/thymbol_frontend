import Loading from '@/components/Loading';
import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { useGetVoucherQuery } from '@/store/api/vouchers/vouchersApiSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalError } from '@/util/helpers';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import icon from './../../assets/images/icon/Icons.png';

function RedeemDeal() {
    const navigate = useNavigate();
    const { id: voucherId } = useParams();
    const { data: voucherData, isLoading: loadingVoucher } =
        useGetVoucherQuery(voucherId);
    const userId = useSelector(selectCurrentUser);

    if (loadingVoucher) return <Loading />;

    const handleClipForLater = async () => {
        try {
            const payload = {
                consume_by: userId,
                clipped_vouchers: [voucherId],
            };
            const response = await fetchWrapper.post(
                '/voucher/clipped-for-later',
                payload
            );
            console.log('🚀  ~ response:', response);
            toast.success('Successfully added to clipped list');

            navigate('/clipped-deals');
        } catch (error) {
            swalError(error);
        }
    };

    return (
        <div className="bg-[#fdffff] min-h-screen h-full flex justify-center">
            <div className="flex items-center justify-center">
                <div className="bg-[#fafafa] p-6 rounded-md shadow-md">
                    <SingleVoucher item={voucherData} />
                    <div className="text-center mt-4 space-y-4">
                        <div className="font-bold text-sm sm:text-base md:text-xl">
                            Thymbol Exclusive Deal
                        </div>
                        <div className="font-semibold text-sm sm:text-base">
                            All deals will expire after 1 hour
                        </div>
                    </div>
                    <div className="flex justify-around text-xs sm:text-base mt-4 py-1 my-1">
                        {/* <Link to={`/clipped-deals`}> */}
                        <button
                            onClick={handleClipForLater}
                            className="bg-customBlue text-white p-2 rounded-md flex my-auto items-center "
                        >
                            <span className="mx-1">
                                <Icon icon="heroicons:bookmark" />
                            </span>
                            Clip for later
                        </button>
                        {/* </Link> */}
                        <Link to={`/redeem-deal-details`}>
                            <button className="bg-customBlue text-white p-2 rounded-md flex items-center">
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
