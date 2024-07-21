import React, { useEffect, useRef, useState } from 'react'
import { projectStatus, TAGS } from '@/helpers/constansts'
import { ProjectStatus, Tag, Tags } from '@/helpers/types'
import { useProjectsContext } from '@/context/ProjectContext'

interface Props {
  status : ProjectStatus,
  setStatus : React.Dispatch<React.SetStateAction<ProjectStatus>>
}
const StatusSelector = ({status , setStatus} : Props) => {
  const [openTagsDisplay , setOpenTagsDisplay] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null);
  const {projectsState} = useProjectsContext()
  const handleClickOutside = (event : MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setOpenTagsDisplay(false);
    }
  };

  const clickProjectHandler = (pId : ProjectStatus) : void  => {
    setStatus(pId)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={componentRef} className='relative w-[80%] flex items-start gap-2'>
      <div className='flex items-center gap-4 '>
        status: 
      <button type='button' onClick={(e) => {
        e.preventDefault()
        setOpenTagsDisplay(prev => !prev)
      }} className='px-4 py-1  outline outline-1 outline-zinc-200 rounded-md shadow-sm' >
        {status}
      </button>
      </div>
        {openTagsDisplay && (
          
            <div className='px-2 py-2 mt-2 absolute top-8 outline outline-1 outline-zinc-200 rounded-md z-[20] bg-white flex flex-col mx-auto gap-2 max-h-[450px] overflow-y-auto'>
            {
              projectStatus.map(status => (
                <div 
                  onClick={() =>{
                    clickProjectHandler(status)
                    setOpenTagsDisplay(false)
                  }} 
                  className='hover:bg-zinc-100 py-2 px-4 rounded-sm cursor-pointer outline outline-1 outline-zinc-100' 
                  key={status}
                >
                  <p className=''>{status}</p>
                </div>
              ))
            }
          </div>
          
        )
      }
    </div>
  )
}

export default StatusSelector