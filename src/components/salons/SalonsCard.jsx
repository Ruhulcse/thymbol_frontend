import { infoIcon } from "@/constant/data";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import UpdateButton from "../button/UpdateButton";
const [firstIcon] = infoIcon;

function SalonsCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full h-auto">
      <div className="flex justify-center mb-4">
        <div className="h-20 w-20 md:h-32 md:w-32 rounded-full overflow-hidden">
          <Link to={`/store/${item._id}`}>
            <img
              src={
                item?.logo?.filePath ||
                "https://cdn-icons-png.flaticon.com/512/2474/2474161.png"
              }
              alt={`${item?.store_name} logo`}
              className="h-full w-full object-cover rounded-full"
            />
          </Link>
        </div>
      </div>
      <div className="text-center">
        <Link to={`/store/${item._id}`}>
          <div className="font-bold text-[12px] md:text-base text-left capitalize">
            {item?.store_name}
          </div>
        </Link>
        <div className="text-[9px] md:text-sm mt-2">{item.body}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-8 w-11 bg-blue-600 rounded-2xl flex justify-center items-center font-bold">
          <Icon className="text-white " icon={firstIcon.icon} />
        </div>
        <p className="text-black-500">{Math.floor(item.distance) / 1000} KM</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-[13px] md:text-base font-semibold text-orange-600">
          {item?.Discount}% off
        </div>
        <div>
          {" "}
          <p></p>
        </div>
        <Link to={`/store/${item._id}`}>
          <UpdateButton ButtonName={t("Redeem")} />
        </Link>
      </div>
    </div>
  );
}

export default SalonsCard;
