import { t } from "i18next";
import { Link } from "react-router-dom";
const NewModal = ({ activeModal, setActiveModal }) => {
  const onClose = () => {
    setActiveModal(false);
  };
  if (!activeModal) return null;
  const hadleClose = (e) => {
    if (e.target.id == "wrapper") onClose();
  };
  return (
    <div
      onClick={hadleClose}
      className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <div className="w-[600px] flex flex-col mx-2">
        <button
          onClick={onClose}
          className="text-black-500 text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-[#38b6ff] p-2 rounded-lg py-6 md:py-10">
          <div className="bg-[#38b6ff] ">
            <div className="w-full ">
              <div></div>
              <div className="text-center flex flex-col items-center justify-center space-y-2 text-white ">
                {""}
                <div className="relative w-fit ">
                  <p className="text-center font-bold text-2xl md:text-4xl text-white ">
                    {t("subscription title")}
                  </p>
                  <img
                    className="absolute bottom-6 md:bottom-8  w-8 md:w-10"
                    src="/crown.png"
                    alt="crown"
                  />
                </div>
                <p className="text-base px-4">{t("subscription details")}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#38b6ff] flex w-full items-center justify-center py-4">
            <Link
              className="bg-[#004bad] text-white font-semibold text-xl py-2 px-4 rounded-xl"
              to="/consumer-subscription"
            >
              {t("subscription btn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewModal;
