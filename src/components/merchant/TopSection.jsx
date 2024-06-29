import { infoIcon } from '@/constant/data'
import { Icon } from '@iconify/react'
import img from '@/assets/images/merchant/profile.png';
function TopSection() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 items-center md:h-96 h-40 w-full justify-center relative'>
    {/* Centered image */}
    <div className='lg:h-60 lg:w-60 h-28 w-28 rounded-full mx-auto flex items-center justify-center overflow-hidden absolute sm:relative sm:top-0 sm:translate-x-0 sm:transform-none top-0 left-1/2 transform -translate-x-1/2 -translate-y-[100%] sm:left-0 md:h-44 md:w-44'>
      <img src={img} alt="" className='h-full w-full object-cover'/>
    </div>
    <div className='col-span-2 sm:text-start space-y-5 font-semibold'>
      <div className='font-bold hidden sm:block md:text-2xl'>Diva noce</div>
      <div className='text-sm text-center sm:text-start md:text-lg'> Lorem Ipsum is simply dummy text</div>
      <div className='text-center sm:text-start sm:justify-start flex justify-center gap-16 text-xs md:text-[14px]'>
        <div className=' flex items-center gap-3'>Make Us Your Favorite <span className='inline-flex sm:ml-8'><Icon icon='heroicons:heart' className='text-blue-600 mx-auto text-sm'/></span></div>
        <div className=''>Favorited by <span className='text-blue-400 font-bold'>123</span> Users </div>
      </div>
      <div className='sm:flex hidden gap-4 text-xs md:text-[14px]'>
        <div className=''><span className='inline-flex '><Icon icon='heroicons:map-pin' className='text-orange-500 mx-auto text-sm'/></span> Location (dummy text lorem ipsum)</div>
        <div className=''> <span className='inline-flex'><Icon icon='heroicons:phone' className='text-orange-500 mx-auto text-sm'/></span>+1 35 84 56 8374</div>
      </div>
      <div className='flex justify-center gap-7 mt-2 sm:hidden'>
        {infoIcon.map((item,i)=>(
          <div className='h-8 w-11 bg-blue-600 rounded-2xl flex justify-center items-center font-bold' key={i}>
            <Icon className='text-white '
            icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default TopSection