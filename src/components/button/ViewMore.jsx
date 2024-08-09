import { useTranslation } from 'react-i18next';

const ViewMore = ({ className = '', onClickHandler, isLoading = false }) => {
    const { t } = useTranslation();
    return (
        <div
            className={` justify-center hidden ${className}`}
            onClick={onClickHandler}
        >
            <button className="bg-[#0c9ad6] py-4 px-20 text-white text-center items-center inline-block mt-16 rounded-md">
                {isLoading ? (
                    <>
                        <svg
                            className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 unset-classname`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        {/* {t('Loading ...')} */}
                    </>
                ) : (
                    t('View More')
                )}
            </button>
        </div>
    );
};

export default ViewMore;
