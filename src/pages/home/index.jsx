import BusinessSpotlight from '@/components/businessSpotlight';
import Featured from '@/components/featured';
import Header from '@/components/header';
import Loading from '@/components/Loading';
import Restaurants from '@/components/restaurants';
import { spotlight } from '@/data/BusinessSpotlight!';
import { featured } from '@/data/featuredData';
import { selectCurrentLatLng } from '@/store/api/GeoLocation/geoLocationSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalError } from '@/util/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const currentLocation = useSelector(selectCurrentLatLng);
    const [storeData, setStoreData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNearByStores = async () => {
        setLoading(true);
        try {
            if (currentLocation.lat && currentLocation.lng) {
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
            swalError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNearByStores();
    }, [currentLocation]);

    if (loading) return <Loading />;

    return (
        <div className="bg-[#F3FCFF] ">
            <div className="py-16">
                <Header />
                {/* featured categories */}
                <Featured data={featured} />
                {/* Business Spotlight! */}
                <BusinessSpotlight data={spotlight} />
                {/* Great Deals Near Me */}
                {/* <GreatDeals data={greatDealsData} /> */}
                {/* Restaurants Near Me */}
                <Restaurants data={storeData} />
                {/* Salons Near Me */}

                {/* <SalonsNear data={salonsData} /> */}
            </div>
        </div>
    );
}

export default Home;
