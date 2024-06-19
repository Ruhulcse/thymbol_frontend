import { Icon } from '@iconify/react'
import icon from './../../assets/images/home/Group 1000005429.png'


const SingleCard =({item})=> {
  return (
    <div className='w-[345px] h-[185px] relative  mt-12 bottom-0 shadow-lg'>
        
       <div className='h-full w-full'>
       <div className='w-[345px] h-[185px] bg-white'>
        <img src={icon} alt="" className='absolute top-[-50%] right-5 transform translate-y-[150%]' />
        <div className='grid grid-cols-3 p-3'>
            <div className='w-[100px] h-[94px]'> <img src={item.image} alt="" className='w-full h-full'/></div>
            <div className='col-span-2 p-2'>
                <div className='text-base font-bold'>{item.title}</div>
                <div className='text-sm'>{item.body}</div>
            </div>
            <div className='flex  items-center h-20 w-full justify-start px-1'>
                <Icon
                icon="heroicons:star-solid"
                className='text-yellow-500  text-xl'
                /> 
                <p>{item.rating}</p>

            </div>
            <div className='flex  items-center h-20 w-full justify-start  col-span-2 text-sm'>{item.reviews} reviews</div>
        </div>
        </div>
       </div>

    </div>
  )
}

export default SingleCard