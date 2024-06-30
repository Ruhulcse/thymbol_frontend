import BusinessSpotlight from '@/components/businessSpotlight';
import Featured from '@/components/featured';
import GreatDeals from '@/components/greatDeals';
import Header from '@/components/header';
import Restaurants from '@/components/restaurants';
import SalonsNear from '@/components/salonsNear';
import { spotlight } from '@/data/BusinessSpotlight!';
import { greatDealsData } from '@/data/cardData';
import { featured } from '@/data/featuredData';
import { salonsData } from '@/data/salonsData';
import { selectCurrentLatLng } from '@/store/api/GeoLocation/geoLocationSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalError } from '@/util/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const currentLocation = useSelector(selectCurrentLatLng);
    const [storeData, setStoreData] = useState([]);

    const getNearByStores = async () => {
        try {
            const payload = {
                coordinates: [currentLocation.lat, currentLocation.lng],
            };
            const { data } = await fetchWrapper.post(`/store/nearme`, payload);
            console.table('🚀  ~ data:', data);
            setStoreData(data);
        } catch (error) {
            swalError(error);
        }
    };

    useEffect(() => {
        getNearByStores();
    }, [currentLocation]);

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
