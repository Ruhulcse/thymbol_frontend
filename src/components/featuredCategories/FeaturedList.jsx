import SingleFeatured from "@/components/featuredCategories/SingleFeatured"



const FeaturedList =({data}) => {
  return (
    <div className="flex justify-between  gap-4 mt-12 overflow-x-visible overflow-y-hidden">
      {data.map((item,i)=>(
        <SingleFeatured item={item} key={i}/>
      ))}
    </div>
  )
}

export default FeaturedList