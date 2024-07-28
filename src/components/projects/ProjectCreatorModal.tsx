import { useProjectsContext } from '@/context/ProjectContext'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProjectPriority } from '@/helpers/types'
import PrioritySelector from './PrioritySelector'

interface Props {
  setShow : Dispatch<SetStateAction<boolean>>
}

const ProjectCreatorModal = ({setShow} : Props) => {
  const {projectsDispatch} = useProjectsContext()
  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')
  const [date , setDate] = useState<Date>(new Date(Date.now()))
  const [deadline , setDeadline] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  const [priority , setPriority] = useState<ProjectPriority>(ProjectPriority.Low)

  const formatDateForInput = (date : Date) : string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  async function createProject(){
    await projectsDispatch({
      type : 'ADD_PROJECT',
      payload : {
        title , deadline,description, startDate : date, priority
      }
    })
    setShow(false)
  }
  return (
    <div
      className='absolute w-[100vw] h-[100vh] top-0 left-0 bg-[rgba(0,0,0,0.01)] flex justify-center items-center'
    >
      <div className=' px-8 md:px-16 py-12 w-[80%] md:w-[50%] min-h-[50%] rounded-md shadow-md bg-white'>
        <div className='flex flex-col gap-5'>
          <label className='flex items-center text-lg gap-2'> 
            <input 
              placeholder='Title'
              className='w-full outline outline-1 outline-zinc-200 py-1 px-3 rounded-md shadow-sm placeholder:text-zinc-700' 
              value={title} 
              onChange={e => setTitle(e.target.value)} 

            />
          </label>
          <label className='flex items-center  gap-2'>
            Start date: 
            <input 
              type='date' 
              className='outline outline-1 outline-zinc-200 py-1 px-3 rounded-md shadow-sm' 
              value={formatDateForInput(date)} 
              onChange={e => setDate(new Date(e.target.value))} 
            />
          </label>
          <label className='flex items-center  gap-2'>
            Deadline: 
            <input 
              type='date' 
              className='outline outline-1 outline-zinc-200 py-1 px-3 rounded-md shadow-sm' 
              value={formatDateForInput(deadline)} 
              onChange={e => setDeadline(new Date(e.target.value))} 
            />
          </label>
          <PrioritySelector priority={priority} setPriority={setPriority}/>
          <label className='flex flex-col gap-2'>
            <span className=''>Description: </span>
            <textarea
              rows={5}
              className='outline outline-1 outline-zinc-300 bg-zinc-50 resize-none py-1 px-3 rounded-md shadow-sm' value={description} onChange={e => setDescription(e.target.value)} />
          </label>
          <div
            className='flex items-center justify-end gap-2 md:gap-6'
          >
            <button
              onClick={
                () => {
                  createProject()
                }
              }
              className='bg-zinc-900 text-white  py-2 px-4 rounded-md shadow-sm cursor-pointer'
            >
              Create Project
            </button>
            <button
              className='hover:bg-zinc-100  py-2 px-4 rounded-md hover:shadow-sm cursor-pointer'
              onClick={() => {setShow(false)}}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCreatorModal