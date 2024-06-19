import SingleFeatured from "@/components/featuredCategories/SingleFeatured"
import { featured } from "@/data/featuredData"


const FeaturedList =() => {
  return (
    <div className="flex justify-between  gap-4 mt-12 overflow-x-auto">
      {featured.map((item,i)=>(
        <SingleFeatured item={item} key={i}/>
      ))}
    </div>
  )
}

export default FeaturedList