import { t } from "i18next";
import { Link } from "react-router-dom";

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
      <div className="flex justify-between items-center mt-4">
        <div className="text-[13px] md:text-base font-semibold text-orange-600">
          {item?.Discount}% off
        </div>
        <Link to={`/store/${item._id}`}>
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-6"
          >
            {t("Redeem")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SalonsCard;
