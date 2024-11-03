import GenerateQR from '@/components/generateQR';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import {
	useCreateClippedVoucherMutation,
	useGetVoucherQuery,
	useRedeemVoucherMutation,
} from '@/store/api/vouchers/vouchersApiSlice';
import { humanDate, swalError } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon from './../../assets/images/icon/Icons.png';

function RedeemDeal({ voucherId }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [qrAPIData, setqrAPIData] = useState(null);
	const [
		createClippedVoucher,
		{ isLoading: loadingClipped, isError, error, isSuccess },
	] = useCreateClippedVoucherMutation();

	const [
		redeemVoucher,
		{
			isLoading: redeemLoading,
			isError: redeemIsError,
			error: redeemError,
			isSuccess: redeemIsSuccess,
		},
	] = useRedeemVoucherMutation();

	// const { id: voucherId } = useParams();
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

			if (userId) {
				await createClippedVoucher({ data: payload }).unwrap();

				navigate('/clipped-deals');
				toast.success('Voucher added to your Clipped Deals');
			} else {
				navigate('/login');
			}
		} catch (error) {
			swalError(error?.data?.message || 'Something went wrong');
		}
	};

	const handleRedeemDeal = async () => {
		try {
			const payload = {
				voucher: voucherData._id,
				voucherCode: voucherData.voucherCode,
			};
			if (userId) {
				const { data } = await redeemVoucher({
					data: payload,
				}).unwrap();
				const { voucher, voucherCode, creator } = data;

				setqrAPIData({ voucher, voucherCode, creator });
			} else {
				navigate('/login');
			}
		} catch (error) {
			swalError(error?.data?.message || 'Something went wrong');
		}
	};

	return redeemIsSuccess ? (
		<>
			<GenerateQR qrAPIData={qrAPIData} />
		</>
	) : (
		// <div className="bg-[#fdffff] min-h-screen h-full flex justify-center">
		<div className="bg-[#fdffff] h-fit flex justify-center">
			<div className="flex items-center justify-center">
				<div className="bg-[#fafafa] p-6 rounded-md shadow-md">
					<SingleVoucher item={voucherData} />
					<div className="text-center mt-4 space-y-4">
						<div className="font-bold text-sm sm:text-base md:text-xl">
							{t('Thymbol Exclusive Deal')}
						</div>
						<div className="font-semibold text-sm sm:text-base">
							{/* All deals will expire after 1 hour */}
							All deals will expire after {humanDate(voucherData?.endDate)}
						</div>
					</div>
					<div className="flex justify-around text-xs sm:text-base mt-4 py-1 my-1">
						<Button
							onClick={handleClipForLater}
							isLoading={loadingClipped}
							className="bg-customBlue text-white  rounded-md flex my-auto items-center font-normal"
						>
							<span className="mx-1">
								<Icon icon="heroicons:bookmark" />
							</span>
							{t('Clip for later')}
						</Button>

						<Button
							isLoading={redeemLoading}
							onClick={handleRedeemDeal}
							className="bg-customBlue text-white rounded-md flex items-center font-normal"
						>
							{' '}
							<span className="mx-1 h-4 w-4">
								<img src={icon} alt="" className="h-full w-full z-10" />
							</span>
							{t('Redeem Deal')}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RedeemDeal;
