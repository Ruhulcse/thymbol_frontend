import React from 'react'

function Title({children,onclick}) {
  return (
    <div className="flex md:flex-none justify-between md:block  mx-8">
      <div className="text-center font-bold md:text-2xl lg:text-3xl text-black-500 text-xl">{children}</div>
      <div className="md:hidden cursor-pointer" onClick={onclick}>see all</div>
      </div>
  )
}

export default Title