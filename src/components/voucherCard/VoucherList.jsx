import SingleVoucher from "@/components/voucherCard/SingleVoucher";
import { useGetVoucherByStoreQuery } from "@/store/api/vouchers/vouchersApiSlice";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import ViewMore from "../button/ViewMore";

function VoucherList() {
  const { id: store_id } = useParams();
  const { data: vouchers, isLoading: loadingVoucher } =
    useGetVoucherByStoreQuery(store_id);

  if (loadingVoucher) return <Loading />;

  return (
    <>
      {!!vouchers?.length ? (
        <>
          <div className="flex gap-3 overflow-x-scroll overflow-y-hidden sm:overflow-hidden sm:flex sm:flex-wrap sm:justify-center  mt-8 mx-8">
            {vouchers?.map((item, i) => (
              <SingleVoucher item={item} key={item._id} />
            ))}
          </div>
          <ViewMore className={"hidden md:flex"} />
        </>
      ) : (
        <div className="text-center font-semibold mt-10 text-base md:text-xl text-slate-500">
          No vouchers available at the moment
        </div>
      )}
    </>
  );
}

export default VoucherList;
