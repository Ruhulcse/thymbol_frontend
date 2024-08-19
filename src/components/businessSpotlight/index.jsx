import { t } from "i18next";

function BusinessSpotlight({ data }) {
  return (
    <div className="container mx-auto mt-24">
      <div className="text-center font-bold md:text-2xl lg:text-3xl text-black-500 text-xl">
        {t("Business Spotlight!")}
      </div>
      <div className="flex justify-around mt-12 gap-6">
        {data.map((item, i) => (
          <img
            src={item}
            key={i}
            className="lg:max-w-[195px] w-[75px] h-[75px] rounded-full sm:rounded-md sm:max-h-[185px] sm:max-w-[100px] sm:w-full sm:h-full"
          />
        ))}
      </div>
    </div>
  );
}

export default BusinessSpotlight;
