import logo from './../../assets/images/home/Group 1000005441.png'

function SalonsCard({item}) {
  return (
   <div>
    <div className='md:w-[210px] md:h-72 w-[140px] h-[185px]  bg-white'>
       <div className='flex justify-center  mx-auto content-center justify-items-center py-4'>
       <div className='md:h-32 md:w-32 h-20 w-20 rounded-full'><img src={item.image} className='h-full w-full rounded-full'/></div>
       </div>
        <div className='text-black-500 px-4 md:px-6'>
            <div className='font-bold text-[12px] md:text-base'>{item.title}</div>
            <div className='md:text-sm text-[9px]'>{item.body}</div>
        </div>
        <div className='flex justify-between px-4 md:px-6 md:mt-4'>
            <div className='md:text-sm text-[11px] font-semibold text-orange-600'>{item.sellOff} off</div>
            <div className='md:h-8 md:w-8 h-6 w-6 rounded-full'><img src={logo} className='h-full w-full rounded-full'/></div>
        </div>
    </div>

   </div>
  )
}

export default SalonsCard