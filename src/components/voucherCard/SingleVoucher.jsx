import { selectSubscriptionType } from "@/store/api/auth/authSlice";
import { t } from "i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UpgradeModal from "../upgradeModal";
function SingleVoucher({ item, link = "redeem-deal-details", canRedeem = 25 }) {
  const [activeModal, setActiveModal] = useState(false);
  const redeemValidation = () => {
    setActiveModal(true);
  };
  const subscriptionType = useSelector(selectSubscriptionType);

  return (
    <div className="lg:h-44 lg:w-[490px] h-[110px] w-[220px] bg-white shadow-lg sm:w-[270px] sm:h-[120px] md:h-[150px] md:w-[330px]">
      <div className="w-full h-full relative">
        {/* Right side circle */}
        <div className="lg:h-8 h-3 lg:w-8 w-3 rounded-full bg-[#f9f9f9]  absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 overflow-hidden "></div>
        {/* Left side circle */}
        <div className="lg:h-8 h-3 lg:w-8 w-3  rounded-full bg-[#f9f9f9]  absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 overflow-hidden"></div>
        <div className="flex flex-1 items-center px-4 h-full">
          <div className=" p-4 border-r-4 w-full border border-t-0 border-l-0 border-b-0 border-dotted mr-4">
            <div className="font-bold text-xs lg:text-sm cursor-pointer">
              {canRedeem > 25 && subscriptionType?.toLowerCase() === "free" ? (
                <div onClick={redeemValidation}>{item?.storeName}</div>
              ) : (
                <Link to={`/${link}/${item?._id}`}>{item?.storeName}</Link>
              )}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-[14px]">
              {item?.condition}
            </div>
            <div className="flex justify-between px-0 md:px-0 md:mt-4 mt-2 items-center">
              <div className="md:text-sm text-[9px] sm:text-[11px] font-semibold text-orange-600 lg:text-[16px]">
                {item?.discount ? <>{item?.discount}% off</> : item.offer}
              </div>
              <div className="md:h-8 md:w-8 sm:h-5 sm:w-5 h-4 w-4 flex items-center lg:h-10 lg:w-20 ">
                {canRedeem > 25 &&
                subscriptionType?.toLowerCase() === "free" ? (
                  //   <img
                  //     src={logo}
                  //     className="h-full w-full rounded-full cursor-pointer"
                  //     onClick={redeemValidation}
                  //   />
                  <button
                    onClick={redeemValidation}
                    type="button"
                    class="focus:outline-none w-16 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-normal rounded-lg text-xs px-2 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 pr-6"
                  >
                    {t("Redeem")}
                  </button>
                ) : (
                  <Link to={`/${link}/${item?._id}`}>
                    {/* <img src={logo} className="h-full w-full rounded-full" /> */}
                    <button
                      type="button"
                      class="focus:outline-none w-16 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-normal rounded-lg text-xs px-2 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 pr-6"
                    >
                      {t("Redeem")}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-80 lg:h-36 sm:h-24 sm:w-52 h-20 w-44  my-auto lg:p-2 cursor-pointer">
            {canRedeem > 25 ? (
              <img
                src={
                  item?.logo?.filePath ??
                  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
                alt=""
                className="h-full w-full object-cover"
                onClick={redeemValidation}
              />
            ) : (
              <Link to={`/${link}/${item?._id}`}>
                <img
                  src={
                    item?.logo?.filePath ??
                    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  }
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <UpgradeModal activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
}

export default SingleVoucher;
