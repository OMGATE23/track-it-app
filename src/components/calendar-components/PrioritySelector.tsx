import React, { useEffect, useRef, useState } from 'react'
import { TAGS } from '@/helpers/constansts'
import { Tag } from '@/helpers/types'

interface Props {
  priority : Tag,
  setPriority : React.Dispatch<React.SetStateAction<Tag>>
}
const PrioritySelector = ({priority , setPriority} : Props) => {
  const [openTagsDisplay , setOpenTagsDisplay] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event : MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setOpenTagsDisplay(false);
    }
  };

  const clickProjectHandler = (priority : Tag) : void  => {
    setPriority(priority)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={componentRef} className='relative w-fit flex items-start gap-2'>
      <div className='flex items-center gap-4 '>
        Priority: 
      <button type='button' onClick={(e) => {
        e.preventDefault()
        setOpenTagsDisplay(prev => !prev)
      }} className='  outline outline-1 outline-zinc-800 rounded-md shadow-sm' >
        <span className={`block w-full h-full px-4 py-1 ${priority.background} rounded-md`}>{priority.tag}</span>
      </button>
      </div>
        {openTagsDisplay && (
          
            <div className='px-2 py-2 mt-2 absolute top-8 right-0 outline outline-1 outline-zinc-200 rounded-md z-[20] bg-white flex flex-col mx-auto gap-2 max-h-[450px] overflow-y-auto'>
            {
              TAGS.priority.map(priority => (
                <div 
                  onClick={() =>{
                    clickProjectHandler(priority)
                    setOpenTagsDisplay(false)
                  }} 
                  className='hover:bg-zinc-100 py-2 px-4 rounded-sm cursor-pointer outline outline-1 outline-zinc-100' 
                  key={priority.tag + priority.type}
                >
                  <p className=''>{priority.tag}</p>
                </div>
              ))
            }
          </div>
          
        )
      }
    </div>
  )
}

export default PrioritySelector