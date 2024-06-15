import { cover, morocco, soudia, topBarImage, usa } from "@/assets/images/home";
import ViewMore from "@/components/button/viewMore";
import CardList from "@/components/card/CardList";
import FeaturedList from "@/components/featuredCategories/FeaturedList";
import SalonsList from "@/components/salons/SalonsList";
import { spotlight } from "@/data/BusinessSpotlight!";
import { greatDealsData } from "@/data/cardData";
import UserLayout from "@/layout/UserLayout";
import { Icon } from "@iconify/react";

const data = [
  {
    name:"Morocco",
    image: morocco
  },
  {
    name:"Saudi Arabia",
    image:soudia
  },
  {
    name:"USA",
    image:usa
  }
]


function Home() {
  return (
  <div className="bg-[#F3FCFF]">
    <UserLayout/>
     <div className="">
     <div className="container mx-auto">
      <div className="  md:flex justify-between ">
        <div className="max-w-lg sm:h-80 font-bold ">
          <div className=" text-2xl hidden sm:block">
            <span className="text-blue-500">Thymbol</span> - Your One-Stop Stop
            for Voucher and Discounts
          </div>
          <p className="hidden sm:block py-4">Your World of Deals!</p>
          <p className="hidden sm:block py-4">Serving:</p>
          <span className=" gap-2 hidden sm:flex">
            {data.map((item,i)=>(
              <span className="flex gap-1 items-center"><img src={item.image}/>{item.name}</span>
            ))}
          </span>
          <div className="sm:mt-10 flex space-x-4 font-normal mt-[-17px] sm:justify-start justify-center ">
            <div className="flex relative w-[60%] ">
            <input type="text" placeholder="Search Location " className="w-full sm:h-16 h-8 shadow-lg px-4 rounded-lg z-[50] " />
           <div className="absolute  top-[50%] -translate-y-[50%] right-0 font-bold pr-2 text-xl text-blue-500
            z-[60]">
            <Icon className=""
            icon={'heroicons:adjustments-horizontal'}
            />
           </div>
            </div>
             <div className="bg-white shadow-lg h-8 w-8 sm:h-16 sm:w-16 flex items-center justify-center text-2xl text-blue-500 rounded-lg z-[60]">
             <Icon
            icon={'heroicons:magnifying-glass'}
            />
             </div>
          </div>
        </div>
        <div className="max-w-lg h-80 hidden sm:block">
          <img src={topBarImage} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
    {/* cover Image */}
    <div className="w-full mt-24 h-56 hidden sm:block">
      <img src={cover}className="w-full h-full" alt="" />
    </div>
    {/* featured categories */}
    <div className="container mx-auto mt-24">

      <div className="flex justify-between items-baseline">
      <div className="font-bold text-3xl text-black-500">Featured Categories</div>
      <div>See all</div>
      </div>
      <FeaturedList/>
    </div>
    {/* Business Spotlight! */}
    <div className="container mx-auto mt-24">
      <div className="text-center font-bold text-3xl text-black-500">Business Spotlight!</div>
     <div className="flex justify-around mt-12 gap-6">
     {spotlight.map((item,i)=>(
        <img src={item} key={i} className="lg:max-w-[195px] w-[75px] h-[75px] rounded-full sm:rounded-md sm:max-h-[185px] sm:max-w-[100px] sm:w-full sm:h-full"/>
      ))}
     </div>
    </div>
    <div className="lg:container mx-auto mt-24 w-full">
      <div className="flex md:flex-none justify-between md:block px-4">
      <div className="text-center font-bold md:text-2xl lg:text-3xl text-black-500 text-xl">Great Deals Near Me</div>
      <div className="md:hidden">see all</div>
      </div>
      <CardList data={greatDealsData}/>
     <ViewMore className={'hidden lg:flex'}/>
    </div>
    <div className="lg:container mx-auto mt-24 w-full">
    <div className="flex md:flex-none justify-between md:block px-4">
      <div className="text-center font-bold md:text-2xl lg:text-3xl text-black-500 text-xl">Restaurants Near Me</div>
      <div className="md:hidden">see all</div>
      </div>
    <SalonsList/>
    <ViewMore className='hidden '/>
    </div>
   </div>
  </div>
  );
}

export default Home;
