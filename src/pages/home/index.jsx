import BusinessSpotlight from '@/components/businessSpotlight';
import Featured from '@/components/featured';
import Header from '@/components/header';
import HomeBanner from '@/components/homeBanner';
import Loading from '@/components/Loading';
import Restaurants from '@/components/restaurants';
import { spotlight } from '@/data/BusinessSpotlight!';
import { featured } from '@/data/featuredData';
import { selectCurrentLatLng } from '@/store/api/GeoLocation/geoLocationSlice';
import { setSearchTrigger } from '@/store/api/storeSearch/storeSearchSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const currentLocation = useSelector(selectCurrentLatLng);
    const [storeData, setStoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { search_term, search_trigger } = useSelector(
        (state) => state.searchStore
    );

    const getNearByStores = async () => {
        setLoading(true);
        try {
            if (search_trigger) {
                setError('');
                const payload = {
                    searcItem: search_term,
                };
                const { data } = await fetchWrapper.post(
                    `/store/search`,
                    payload
                );

                setStoreData(data);
            } else if (currentLocation.lat && currentLocation.lng) {
                const payload = {
                    coordinates: [currentLocation.lat, currentLocation.lng],
                };
                const { data } = await fetchWrapper.post(
                    `/store/nearme`,
                    payload
                );

                setStoreData(data);
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            dispatch(setSearchTrigger(false));
            setLoading(false);
        }
    };

    useEffect(() => {
        getNearByStores();
    }, [currentLocation, search_trigger]);

    if (loading) return <Loading />;

    return (
        <div className="bg-[#F3FCFF] ">
            <HomeBanner />
            <div className="py-16">
                <Header />
                {/* featured categories */}
                <Featured data={featured} />
                {/* Business Spotlight! */}
                <BusinessSpotlight data={spotlight} />
                {/* Great Deals Near Me */}
                {/* <GreatDeals data={greatDealsData} /> */}
                {/* Restaurants Near Me */}
                {error.length ? (
                    <div className="text-center text-red-500 tracking-tight my-10 font-medium py-10 text-2xl">
                        {error}
                    </div>
                ) : (
                    <Restaurants data={storeData} />
                )}
                {/* Salons Near Me */}

                {/* <SalonsNear data={salonsData} /> */}
            </div>
        </div>
    );
}

export default Home;
