import SingleVoucher from '@/components/voucherCard/SingleVoucher';
import { useGetVoucherByStoreQuery } from '@/store/api/vouchers/vouchersApiSlice';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

function VoucherList() {
    const { id: store_id } = useParams();
    const { data: vouchers, isLoading: loadingVoucher } =
        useGetVoucherByStoreQuery(store_id);

    if (loadingVoucher) return <Loading />;

    return (
        <div className="flex gap-3 overflow-x-scroll overflow-y-hidden sm:overflow-hidden sm:flex sm:flex-wrap sm:justify-center  mt-8 mx-8">
            {vouchers?.map((item, i) => (
                <SingleVoucher item={item} key={item._id} />
            ))}
        </div>
    );
}

export default VoucherList;
