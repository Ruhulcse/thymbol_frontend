import SingleVoucher from '@/components/voucherCard/SingleVoucher';

function VoucherList({ data }) {
    return (
        <div className="flex gap-3 overflow-x-scroll overflow-y-hidden sm:overflow-hidden sm:flex sm:flex-wrap sm:justify-center  mt-8 mx-8">
            {data.map((item, i) => (
                <SingleVoucher item={item} key={i} />
            ))}
        </div>
    );
}

export default VoucherList;
