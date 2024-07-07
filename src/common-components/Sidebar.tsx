import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-[100%] min-w-[200px]  py-8 px-2'> 
        <ul className='flex flex-col gap-4'>
            <li className='sidebar-options'>Projects</li>
            <li className='sidebar-options'>Analytics</li>
            <li className='sidebar-options'>Insights</li>
            <li className='sidebar-options'>Ask TrackAI</li>
        </ul>
    </div>
  )
}

export default Sidebar