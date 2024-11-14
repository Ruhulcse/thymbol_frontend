import RedeemDeal from "@/pages/redeemDeal";
import { selectSubscriptionType } from "@/store/api/auth/authSlice";
import { t } from "i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import NewModal from "../upgradeModal/NewModal";

function SingleVoucher({ item, link = "redeem-deal-details", canRedeem = 25 }) {
  // console.log({ canRedeem });

  const [activeModal, setActiveModal] = useState(false);
  const redeemValidation = () => {
    setActiveModal(true);
  };
  const subscriptionType = useSelector(selectSubscriptionType);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="lg:h-44 lg:w-[490px] h-[110px] bg-white shadow-lg sm:w-[270px] sm:h-[120px] md:h-[150px] md:w-[330px] flex flex-col justify-center">
      <div className="w-full relative">
        {/* Right side circle */}
        <div className="lg:h-8 h-3 lg:w-8 w-3 rounded-full bg-[#f9f9f9]  absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 overflow-hidden "></div>
        {/* Left side circle */}
        <div className="lg:h-8 h-3 lg:w-8 w-3  rounded-full bg-[#f9f9f9]  absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 overflow-hidden"></div>
        <div className="flex flex-1 items-center px-4 h-full">
          <div className=" p-4 border-r-4 w-full border border-t-0 border-l-0 border-b-0 border-dotted mr-4">
            <div className="font-bold text-xs lg:text-sm cursor-pointer">
              {canRedeem > 24 && subscriptionType?.toLowerCase() === "free" ? (
                <div onClick={redeemValidation}>{item?.storeName}</div>
              ) : (
                // <Link to={`/${link}/${item?._id}`}>{item?.storeName}</Link>
                <Link onClick={onOpenModal} className="capitalize">
                  {item?.storeName}
                </Link>
              )}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-[14px]">
              {item?.condition}
            </div>
            <div className="flex justify-between px-0 md:px-0 md:mt-4 mt-2 items-center pr-2 rtl:pr-0 w-[100%]">
              <div className="md:text-sm text-[9px] sm:text-[9px] font-semibold text-orange-600 lg:text-[16px]">
                {item?.discount ? <>{item?.discount}% off</> : item.offer}
              </div>
              <div className="md:h-8 md:w-8 sm:h-5 sm:w-5 h-4 w-4 flex items-center lg:h-10 lg:w-20 rtl:z-10 rtl:ml-6 mr-4">
                {canRedeem > 24 &&
                subscriptionType?.toLowerCase() === "free" ? (
                  //   <img
                  //     src={logo}
                  //     className="h-full w-full rounded-full cursor-pointer"
                  //     onClick={redeemValidation}
                  //   />

                  <button
                    onClick={redeemValidation}
                    className="bg-blue-500  font-normal text-[6px] md:text-[10px] py-1 md:py-2 md:px-2 px-1 md:rounded-lg rounded-md text-white mr-6 md:mr-4"
                  >
                    {t("Redeem")}
                  </button>
                ) : (
                  // <Link to={`/${link}/${item?._id}`}>
                  <Link onClick={onOpenModal}>
                    {/* <img src={logo} className="h-full w-full rounded-full" /> */}

                    {/* <UpdatedButton2 ButtonName={t('Redeem')} /> */}
                    <button className="bg-blue-500 font-bold text-[10px] py-1 md:py-2 md:px-2 px-1 md:rounded-lg rounded-md text-white mr-6 md:mr-4">
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
              // <Link to={`/${link}/${item?._id}`}>
              <Link onClick={onOpenModal}>
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
      {/* <UpgradeModal activeModal={activeModal} setActiveModal={setActiveModal} /> */}
      <NewModal activeModal={activeModal} setActiveModal={setActiveModal} />

      <Modal open={open} onClose={onCloseModal} center>
        <RedeemDeal voucherId={item?._id} />
      </Modal>
    </div>
  );
}

export default SingleVoucher;
