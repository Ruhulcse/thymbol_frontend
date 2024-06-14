import logo from './../../assets/images/home/Group 1000005441.png'

function SalonsCard({item}) {
  return (
   <div>
    <div className='w-64 h-72 bg-white'>
       <div className='flex justify-center  mx-auto content-center justify-items-center py-4'>
       <div className='h-36 w-36 rounded-full'><img src={item.image} className='h-full w-full rounded-full'/></div>
       </div>
        <div className='text-black-500 p-2'>
            <div className='font-bold'>{item.title}</div>
            <div className='text-sm'>{item.body}</div>
        </div>
        <div className='flex justify-between mx-4'>
            <div className='text-sm font-semibold text-orange-600'>{item.sellOff} off</div>
            <div className='h-8 w-8 rounded-full'><img src={logo} className='h-full w-full rounded-full'/></div>
        </div>
    </div>

   </div>
  )
}

export default SalonsCard