import { Icon } from '@iconify/react'
import React from 'react'

function Button({children,icon='',className='px-6 my-3'}) {
  return (
    <div className={`bg-blue-500  rounded-md text-white flex ${className}`}><span className='my-auto flex items-center '><Icon
    icon={`heroicons:${icon}`} className={`pr-1 text-[20px]`}/></span>{children}</div>
  )
}

export default Button