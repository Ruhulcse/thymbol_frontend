import ViewMore from '@/components/button/ViewMore';
import SalonsList from '@/components/salons/SalonsList';
import Title from '@/components/title';
import {
    setPageCount,
    setPaginationCategory,
} from '@/store/api/storeSearch/storeSearchSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function Restaurants({ data }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { page_count, isLoading } = useSelector((state) => state.searchStore);

    const handleViewMore = (category) => {
        dispatch(setPaginationCategory(category));
        dispatch(setPageCount(page_count + 1));
    };
    return (
        <div className="lg:container mx-auto mt-24 w-full">
            {data?.length ? (
                <>
                    {data?.map((item) => (
                        <>
                            <Title>{`${t(item?.category + ' NEAR ME')}`}</Title>
                            <SalonsList data={item?.stores} />
                            <div className="my-10">
                                <ViewMore
                                    className="hidden md:flex"
                                    onClickHandler={() =>
                                        handleViewMore(item?.category)
                                    }
                                    isLoading={isLoading}
                                />
                            </div>
                        </>
                    ))}
                </>
            ) : (
                <p className="text:base md:text-xl text-red-500 font-semibold text-center">
                    No Stores Found
                </p>
            )}
        </div>
    );
}

export default Restaurants;
