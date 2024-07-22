import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname()

  function sameRoute(route : string) : boolean {
    return pathname === route
  }
  return (
    <div className='h-[100%] min-w-[200px]  py-8 px-2'> 
        <ul className='flex flex-col gap-4'>
          <li className={`sidebar-options ${sameRoute('/timer') && 'current'}`}>
            <Link href='/timer' >Timer</Link>
          </li>
          <li className={`sidebar-options ${sameRoute('/ai') && 'current'} hover:text-blue-700`}>
            <Link href='/ai' >Ask TrackAI</Link>
          </li>
          <li className='sidebar-options'>
            <Link href='/projects'>
              Projects
            </Link>
          </li>
          <li className='sidebar-options'>
            Analytics
          </li>
      </ul>
  </div>
  )
}

export default Sidebar