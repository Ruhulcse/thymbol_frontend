import ViewMore from '@/components/button/ViewMore'
import Title from '@/components/title'
import VoucherList from '@/components/voucherCard/VoucherList'
import React from 'react'

function VoucherSection({data}) {
  return (
    <div>
        <Title>Our Lattest Coupons</Title>
        <VoucherList data={data}/>
        <ViewMore className={'hidden md:flex'}/>
    </div>
  )
}

export default VoucherSection