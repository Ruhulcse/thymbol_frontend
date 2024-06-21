import React from 'react'
import logo from './../../assets/images/home/Group 1000005441.png'
function SingleVoucher({item}) {
  return (
    <div className='lg:h-44 lg:w-[490px] h-[110px] w-[220px] bg-white shadow-lg sm:w-[270px] sm:h-[120px] md:h-[150px] md:w-[330px]'>
  <div className='w-full h-full relative'>
      {/* Right side circle */}
      <div className='lg:h-8 h-3 lg:w-8 w-3 rounded-full bg-[#F3FCFF]  absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2'></div>
      {/* Left side circle */}
      <div className='lg:h-8 h-3 lg:w-8 w-3  rounded-full bg-[#F3FCFF]  absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2'></div>
      <div className='flex flex-1 items-center px-4 h-full' >

        <div className=' p-2 border-r-4 border-dashed mr-4'>
            <div className='font-bold text-xs lg:text-sm'>{item.title}</div>
            <div className='text-[8px] sm:text-[10px] md:text-xs lg:text-[14px]'>{item.body}</div>
            <div className='flex justify-between px-2 md:px-2 md:mt-4 mt-2'>
            <div className='md:text-sm text-[9px] sm:text-[11px] font-semibold text-orange-600 lg:text-[16px]'>{25} off</div>
            <div className='md:h-8 md:w-8 sm:h-5 sm:w-5 h-4 w-4  rounded-full lg:h-10 lg:w-10'><img src={logo} className='h-full w-full rounded-full'/></div>
        </div>
        </div>
       
        <div className='lg:w-80 lg:h-36 sm:h-24 sm:w-52 h-20 w-44  my-auto lg:p-2'>
            <img src={item.image} alt="" className='h-full w-full' />
        </div>
      </div>
  </div>
  </div>
  
  )
}

export default SingleVoucher