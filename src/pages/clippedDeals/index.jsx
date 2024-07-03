import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { voucherData } from '@/data/voucherData';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { useGetClippedVoucherQuery } from '@/store/api/vouchers/vouchersApiSlice';
import { useSelector } from 'react-redux';

function ClippedDeals() {
    const userId = useSelector(selectCurrentUser);

    const {data, isLoading} = useGetClippedVoucherQuery(userId)
    console.log("🚀  ~ data:", data)
    return (
        <>
            <div className="min-h-screen h-full flex items-center bg-[#F3FCFF]">
                <div className="flex flex-wrap justify-center items-center gap-5 h-full">
                    {voucherData.map((item, i) => (
                        <div key={i} className="bg-white ">
                            <div className="bg-white mx-6 text-lg font-semibold hidden sm:block py-3">
                                {item.user}
                            </div>
                            <div className=" sm:m-4">
                                <SingleVoucher item={item} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ClippedDeals;
