import { cover, morocco, soudia, topBarImage, usa } from "@/assets/images/home";
import SingleCard from "@/components/card/SingleCard";
import FeaturedList from "@/components/featuredCategories/FeaturedList";
import { spotlight } from "@/data/BusinessSpotlight!";
import { Icon } from "@iconify/react";
//import { featured } from "@/data/featuredData";
// import { IoIosSearch } from "react-icons/io";
// import { IoOptionsOutline } from "react-icons/io5";
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
     <div className="container mx-auto">
      <div className="  flex justify-between">
        <div className="max-w-lg h-80 font-bold">
          <div className=" text-2xl">
            <span className="text-blue-500">Thymbol</span> - Your One-Stop Stop
            for Voucher and Discounts
          </div>
          <p>Your World of Deals!</p>
          <p>Serving:</p>
          <span className="flex gap-2">
            {data.map((item,i)=>(
              <span className="flex gap-1 items-center"><img src={item.image}/>{item.name}</span>
            ))}
          </span>
          <div className="mt-10 flex space-x-4 font-normal">
            <div className="flex relative w-full">
            <input type="text" placeholder="Search Location " className="w-full h-16 shadow-lg px-4 rounded-lg z-[50]" />
           <div className="absolute  top-[50%] -translate-y-[50%] right-0 font-bold pr-2 text-xl text-blue-500 z-[60]">
            <Icon
            icon={'heroicons:adjustments-horizontal'}
            />
           </div>
            </div>
             <div className="bg-white shadow-lg h- w-16 flex items-center justify-center text-2xl text-blue-500 rounded-lg">
             <Icon
            icon={'heroicons:magnifying-glass'}
            />
             </div>
          </div>
        </div>
        <div className="max-w-lg h-80">
          <img src={topBarImage} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
    {/* cover Image */}
    <div className="w-full mt-24 h-56">
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
    <SingleCard/>
   </div>
  );
}

export default Home;
