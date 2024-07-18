import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-[100%] min-w-[200px]  py-8 px-2'> 
        <ul className='flex flex-col gap-4'>
            <li className='sidebar-options'>
              <Link href='/timer'>
                Timer
              </Link>
            </li>
            <li className='sidebar-options hover:text-blue-700'>
              <Link href='/ai'>
                Ask TrackAI
              </Link>
            </li>
            <li className='sidebar-options'>Projects</li>
            <li className='sidebar-options'>Analytics</li>
        </ul>
    </div>
  )
}

export default Sidebar