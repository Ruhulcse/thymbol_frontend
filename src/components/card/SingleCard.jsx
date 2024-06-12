import { Icon } from '@iconify/react'
import React from 'react'
import icon from './../../assets/images/home/Group 1000005429.png'
import img from './../../assets/images/home/Rectangle 34626026 (1).png'

function SingleCard() {
  return (
    <div className='w-[345px] h-[185px] relative  mt-12 bottom-0'>
        
        <div className='w-[345px] h-[185px] bg-white'>
        <img src={icon} alt="" className='absolute top-[-50%] right-5 transform translate-y-[150%]' />
        <div className='grid grid-cols-3 p-3'>
            <div className='w-[100px] h-[94px]'> <img src={img} alt="" className='w-full h-full'/></div>
            <div className='col-span-2 p-2'>
                <div className='text-base font-bold'>Diva noce</div>
                <div className='text-sm'>Zubair Mosque, Casabianca Morocoo</div>
            </div>
            <div className='flex  items-center h-20 w-full justify-start px-4'>
                <Icon
                icon="heroicons:star-solid"
                className='text-yellow-500  text-xl'
                /> 
                <p>5.0</p>

            </div>
            <div className='flex  items-center h-20 w-full justify-start  col-span-2 text-sm'>10 reviews</div>
        </div>
        </div>

    </div>
  )
}

export default SingleCard