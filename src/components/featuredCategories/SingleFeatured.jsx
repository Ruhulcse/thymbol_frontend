import { setSearchCategory } from '@/store/api/storeSearch/storeSearchSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const SingleFeatured = ({ item }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleSelectCategory = () => {
        dispatch(setSearchCategory(item.category_name));
    };

    return (
        <div className=" md:bg-white md:w-[209px] md:h-[224px] w-24 h-32 flex flex-col items-center justify-center rounded-xl md:rounded-none hover:shadow-lg transition-shadow delay-100">
            <div className="flex items-center  justify-center flex-col p-2 ">
                <img
                    src={item.image}
                    alt=""
                    className="rounded-full max-w-[90px] min-w-[90px] w-full max-h-[90px] min-h-[90px] h-full object-cover object-bottom cursor-pointer md:max-w-[120px] md:min-w-[120px]  md:max-h-[120px] md:min-h-[120px]"
                    onClick={handleSelectCategory}
                />
            </div>
            <div
                onClick={handleSelectCategory}
                className="text-black-500 text-center text-[11px] md:text-base md:mt-5 font-semibold cursor-pointer"
            >
                {t(item.category_name)}
            </div>
        </div>
    );
};

export default SingleFeatured;
