

function SingleFeatured({item}) {
  return (
    <div className=" bg-white max-w-[209px] min-w-[88px] w-full max-h-[224px] min-h-[95px] h-full">
      <div className="flex items-center  justify-center flex-col m-12">
        <img src={item.image} alt="" className=" rounded-full  max-w-[120px] min-w-[60px] w-full max-h-[120px] min-h-[60px] h-full"/>              
      </div>
        <div className="text-black-500 text-center mt-[-40px] mb-8">{item.name}</div>
    </div>
  )
}

export default SingleFeatured