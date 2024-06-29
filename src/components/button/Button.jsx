import { Icon } from '@iconify/react'
import React from 'react'

function Button({children,icon='',className='', onclick}) {
  return (
    <div onclick={onclick} className={`text-xs lg:text-xl lg:gap-2 flex justify-center items-center bg-blue-500 rounded-md px-2 py-1 text-white ${className}`}><span className='my-auto flex items-center '><Icon
    icon={`heroicons:${icon}`} className={``}/></span>{children}</div>
  )
}

export default Button