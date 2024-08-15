import { infoIcon } from "@/constant/data";
import { selectCurrentUser } from "@/store/api/auth/authSlice";
import {
  useFavoriteStoreMutation,
  useGetStoreQuery,
} from "@/store/api/stores/storesApiSlice";
import { swalError } from "@/util/helpers";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import BusinessHoursClient from "./BusinessHoursClient";

function TopSection() {
  const { id: store_id } = useParams();
  const { data: store, isLoading: loadingStore } = useGetStoreQuery(store_id);

  const [
    favoriteStore,
    { isLoading: loadingFavoriteStore, isSuccess, data, isError, error },
  ] = useFavoriteStoreMutation();
  const currentUser = useSelector(selectCurrentUser);

  const handleAddToFavoriteStore = async () => {
    if (currentUser) {
      const response = await favoriteStore({
        favourite_stores: { favourite_stores: store._id },
      }).unwrap();
      toast.success(response.message);
    } else {
      toast.error("Please login first");
    }
  };

  if (isError) {
    swalError(error?.data?.message);
  }

  if (loadingStore) return <Loading />;

  const showInMapClicked = () => {
    window.open("https://maps.google.com?q=" + store?.address.street);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center w-full justify-center relative gap-4 md:gap-8 md:h-96 h-auto px-4 sm:px-8 py-10">
      {/* Centered image */}
      <div className="lg:h-60 lg:w-60 h-28 w-28 rounded-full mx-auto flex items-center justify-center overflow-hidden relative sm:relative sm:top-0 sm:translate-x-0 sm:transform-none sm:left-0 md:h-44 md:w-44 sm:justify-end">
        <img
          src={
            store?.logo?.filePath ||
            "https://cdn-icons-png.flaticon.com/512/2474/2474161.png"
          }
          alt=""
          className="h-full w-full p-2 object-cover border-2 border-customBlue rounded-full"
        />
      </div>
      <div className="col-span-2 space-y-5 text-center sm:text-start">
        <div className="font-bold sm:hidden text-lg">
          {store?.store_name?.toUpperCase() || "N/A"}
        </div>
        <div className="font-bold hidden sm:block md:text-2xl">
          {store?.store_name?.toUpperCase() || "N/A"}
        </div>
        <div className="text-center sm:text-start flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 sm:gap-10 text-xs md:text-[14px]">
          <div className="flex items-center gap-2">
            <span>{t("Make Us Your Favorite")}</span>
            <span
              className="inline-flex cursor-pointer"
              onClick={handleAddToFavoriteStore}
            >
              <Icon
                icon="heroicons:heart"
                className="text-blue-600 text-base"
              />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>{t("Favorited by")}</span>
            <span className="text-blue-400 font-bold">
              {store?.favouriteStoreCount}
            </span>
            <span>{t("Users")}</span>
          </div>
        </div>

        <div className="hidden sm:flex gap-4 text-xs md:text-[14px]">
          <div className="flex items-center">
            <span className="inline-flex ">
              <Icon
                icon="heroicons:map-pin"
                className="text-orange-500 mx-auto text-lg mr-2 cursor-pointer"
                onClick={showInMapClicked}
              />
            </span>
            {t("Location")}
            <span
              onClick={showInMapClicked}
              className="cursor-pointer text-blue-400"
            >
              ({store?.address?.street ?? "N/A"})
            </span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex">
              <Icon
                icon="heroicons:phone"
                className="text-orange-500 mx-auto text-lg "
              />
            </span>{" "}
            <span className="ms-2">{"N/A"}</span>
          </div>
        </div>
        <div className="hidden sm:flex gap-4 text-xs md:text-[14px]">
          <div className="flex items-center">
            <span className="inline-flex ">
              <Icon
                icon="heroicons:globe-asia-australia"
                className="text-blue-400 mx-auto text-lg mr-2"
              />
            </span>
            {store?.website_link ? (
              <a
                className="text-blue-400"
                target="_blank"
                href={store?.website_link}
              >
                {store?.website_link}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="inline-flex">
              <Icon
                icon="eva:facebook-fill"
                className="text-blue-400 mx-auto text-lg "
              />
            </span>{" "}
            {store?.social_media_link ? (
              <a
                className="text-blue-400"
                target="_blank"
                href={store?.social_media_link}
              >
                {store?.social_media_link}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="hidden sm:flex gap-4 text-xs md:text-[14px]">
          <div className="flex items-center">
            <span className="inline-flex ">
              <Icon
                icon="heroicons:clock"
                className="text-blue-400 mx-auto text-lg  mr-2"
              />
            </span>
            <span>{t("Business Hours")}:</span>
          </div>
        </div>
        <BusinessHoursClient business_hours={store?.business_hours} />
        <div className="flex justify-center gap-7 mt-2 sm:hidden">
          {infoIcon.map((item, i) => (
            <div
              className="h-8 w-11 bg-blue-600 rounded-2xl flex justify-center items-center font-bold"
              key={i}
              onClick={item.icon === "heroicons:map-pin" && showInMapClicked}
            >
              <Icon className="text-white " icon={item.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopSection;
