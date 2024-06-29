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

function Home() {
    return (
        <div className="bg-[#F3FCFF] ">
            <div className="py-16">
                <Header />
                {/* featured categories */}
                <Featured data={featured} />
                {/* Business Spotlight! */}
                <BusinessSpotlight data={spotlight} />
                {/* Great Deals Near Me */}
                <GreatDeals data={greatDealsData} />
                {/* Restaurants Near Me */}
                <Restaurants data={salonsData} />
                {/* Salons Near Me */}
                <SalonsNear data={salonsData} />
            </div>
        </div>
    );
}

export default Home;
