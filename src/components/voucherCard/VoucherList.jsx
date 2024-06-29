import SingleVoucher from '@/components/voucherCard/SingleVoucher'
import React from 'react'

function VoucherList({data}) {
  return (
    <div className='flex gap-7 overflow-x-scroll overflow-y-hidden sm:overflow-hidden sm:flex sm:flex-wrap sm:justify-center  mt-8 mx-8'>
      {data.map((item)=>(
        <SingleVoucher item={item}/>
      ))}
    </div>
  )
}

export default VoucherList