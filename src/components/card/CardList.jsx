import SingleCard from "@/components/card/SingleCard";

//import React from 'react'

function CardList({data}) {
  return <div className="flex md:flex-wrap gap-4 md:justify-around  overflow-x-scroll overflow-y-hidden md:overflow-hidden mx-8 md:mx-6">{
    data.map((item,i)=>(
      <SingleCard item={item} key={i}/>
    ))
  }</div>;
}

export default CardList;
