import BusinessSpotlight from "@/components/businessSpotlight";
import ViewMore from "@/components/button/viewMore";
import Featured from "@/components/featured";
import GreatDeals from "@/components/greatDeals";
import Header from "@/components/header";
import Restaurants from "@/components/restaurants";
import SalonsList from "@/components/salons/SalonsList";
import SalonsNear from "@/components/salonsNear";
import { spotlight } from "@/data/BusinessSpotlight!";
import { greatDealsData } from "@/data/cardData";
import { featured } from "@/data/featuredData";
import { salonsData } from "@/data/salonsData";
import UserLayout from "@/layout/UserLayout";

function Home() {
  return (
  <div className="bg-[#F3FCFF] ">
    <UserLayout/>
     <div className="mt-16">
     <Header/>
    {/* featured categories */}
      <Featured data={featured}/>
    {/* Business Spotlight! */}
    <BusinessSpotlight data={spotlight}/>
    {/* Great Deals Near Me */}
    <GreatDeals data={greatDealsData}/>
    {/* Restaurants Near Me */}
   <Restaurants data={salonsData}/>
   {/* Salons Near Me */}
    <SalonsNear data={salonsData}/>
   
   </div>
  </div>
  );
}

export default Home;
