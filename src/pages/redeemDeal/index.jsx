import SingleVoucher from '@/components/voucherCard/SingleVoucher'
import { voucherData } from '@/data/voucherData'
import { Icon } from '@iconify/react'
import React from 'react'
import icon from './../../assets/images/icon/Icons.png'

function RedeemDeal() {
  return (
    <div className='bg-[#F3FCFF] min-h-screen h-full flex justify-center'>
        <div className='flex items-center justify-center'>
        <div className='bg-white p-6 rounded-md shadow-sm'>
            <SingleVoucher item={voucherData[0]}/>
            <div className='text-center mt-4 space-y-4'>
                <div className='font-bold text-sm md:text-lg'>Thymbol Exclusive Deal</div>
                <div className='font-semibold text-sm'>All deals will expire after 1 hour</div>
            </div>
            <div className='flex justify-between text-xs mt-4 py-1 my-1'>
                <button className='bg-blue-600 text-white px-3 py-2 rounded-md flex my-auto items-center '><span className='mx-1'><Icon icon='heroicons:bookmark'/></span>Clip for later</button>
                <button className='bg-blue-600 text-white px-3 py-2 rounded-md flex items-center'> <span className='mx-1 h-4 w-4'>
                    <img src={icon} alt="" className='h-full w-full z-10' />
                    </span>Redeem Deal</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default RedeemDeal