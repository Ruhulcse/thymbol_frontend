import ViewMore from '@/components/button/ViewMore'
import CardList from '@/components/card/CardList'
import Title from '@/components/title'
//import { greatDealsData } from '@/data/cardData'
import React from 'react'

function GreatDeals({data}) {
  return (
    <div className="lg:container mx-auto mt-24 w-full">
    <Title>Great Deals Near Me</Title>
    
    <CardList data={data}/>
   <ViewMore className={'hidden md:flex'}/>
  </div>
  )
}

export default GreatDeals