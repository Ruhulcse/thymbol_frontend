import { cover, morocco, soudia, topBarImage, usa } from "@/assets/images/home";
import { IoIosSearch } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";
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
            <input type="text" placeholder="Search Location " className="w-full h-16 shadow-lg px-4 rounded-lg" />
           <div className="absolute inset-0 flex justify-end items-center font-bold pr-2 text-xl text-blue-500"> <IoOptionsOutline /></div>
            </div>
             <div className="bg-white shadow-lg h- w-16 flex items-center justify-center text-2xl text-blue-500 rounded-lg"><IoIosSearch /></div>
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

      <div className="font-bold text-3xl text-black-500">Featured Categories</div>
      <div>

      </div>
    </div>
   </div>
  );
}

export default Home;