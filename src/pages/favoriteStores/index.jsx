import Loading from '@/components/Loading';
import SalonsList from '@/components/salons/SalonsList';
import Title from '@/components/title';
import { useGetFavoriteStoresQuery } from '@/store/api/stores/storesApiSlice';

const FavoriteStores = () => {
    const { data: storeData, isLoading } = useGetFavoriteStoresQuery();

    if (isLoading) return <Loading />;
    return (
        <div className="bg-[#F3FCFF] h-screen">
            <div className="py-16">
                <Title>My Favorite Stores</Title>
                <SalonsList data={storeData} />
            </div>
        </div>
    );
};

export default FavoriteStores;
