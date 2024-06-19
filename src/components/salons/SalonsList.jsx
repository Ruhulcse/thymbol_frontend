import SalonsCard from '@/components/salons/SalonsCard'
import img from './../../assets/images/home/Rectangle 34626026 (2).png'
const data = [
    {
        title:'Gourmet Aveny',
        body:'Lorem Ipsum is simply dummy text of the',
        image:img,
        sellOff:'25%'
    },
    {
        title:'Gourmet Aveny',
        body:'Lorem Ipsum is simply dummy text of the',
        image:img,
        sellOff:'25%'
    },
    {
        title:'Gourmet Aveny',
        body:'Lorem Ipsum is simply dummy text of the',
        image:img,
        sellOff:'25%'
    },
   
]

function SalonsList() {
  return (
    <div className='overflow-x-auto flex gap-4 justify-around mt-12 m-12'>
        {data.map((item,i)=>(
            <SalonsCard item={item} key={i}/>
        ))}
    </div>
  )
}

export default SalonsList