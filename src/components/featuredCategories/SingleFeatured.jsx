

const SingleFeatured =({item})=> {
  return (
    <div className=" bg-white md:w-[209px] md:h-[224px] w-24 h-28">
      <div className="flex items-center  justify-center flex-col p-2 ">
        <img src={item.image} alt="" className=" rounded-full  max-w-[120px] min-w-[80px] w-full max-h-[120px] min-h-[80px] h-full"/>              
      </div>
        <div className="text-black-500 text-center text-[11px] md:text-base md:mt-8">{item.name}</div>
    </div>
  )
}

export default SingleFeatured