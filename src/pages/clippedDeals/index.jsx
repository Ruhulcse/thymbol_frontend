import SingleVoucher from '@/components/voucherCard/SingleVoucher'
import { voucherData } from '@/data/voucherData'
import React from 'react'

function ClippedDeals() {
  return (
   <div className='min-h-screen h-full flex items-center bg-[#F3FCFF]'>
     <div className='flex flex-wrap justify-center items-center gap-5 h-full'>
        {voucherData.map((item,i)=>(
            <div key={i} className='bg-white '>
                <div className='bg-white mx-6 text-lg font-semibold hidden sm:block'>{item.user}</div>
                <div className=' sm:m-4'>
                <SingleVoucher item={item} />
                </div>
            </div>
        ))}
    </div>
   </div>
  )
}

export default ClippedDeals