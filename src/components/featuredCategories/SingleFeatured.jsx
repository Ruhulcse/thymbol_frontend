

const SingleFeatured =({item})=> {
  return (
    <div className=" bg-white w-[209px] h-[224px]">
      <div className="flex items-center  justify-center flex-col m-12">
        <img src={item.image} alt="" className=" rounded-full  max-w-[120px] min-w-[80px] w-full max-h-[120px] min-h-[80px] h-full"/>              
      </div>
        <div className="text-black-500 text-center mt-[-40px] mb-8">{item.name}</div>
    </div>
  )
}

export default SingleFeatured