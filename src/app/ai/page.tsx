'use client'
import DatePicker from '@/components/calendar-components/DatePicker'
import DropdownTime from '@/components/calendar-components/DropdownTime'
import AIPageLoader from '@/components/ai/AIPageLoader'
import Header from '@/components/Header'
import Sparkles from '@/components/icons/Sparkles'
import Sidebar from '@/components/Sidebar'
import TaskTimeline from '@/components/ai/TaskTimeline'
import { useDateContext } from '@/context/DateContext'
import { AI_Tasks_Response, P_AI_Task, ProjectPriority } from '@/helpers/types'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { colourOptions, projectPriority } from '@/helpers/constansts'
import { useTaskContext } from '@/context/TaskContext'
import { useProjectsContext } from '@/context/ProjectContext'
import PrioritySelector from '@/components/projects/PrioritySelector'

const TrackItAiPage = () => {
  const {state} = useAuthContext()
  const {state : dateState} = useDateContext()
  const router = useRouter()
  const [title , setTitle] = useState('')
  const [time , setTime] = useState({
    startTime : 1020,
    endTime : 1050,
    useTime : true
  })
  const [description , setDescription] = useState('')
  const [noOfDays, setNoOfDays] = useState(3)
  const [tasks, setTasks] = useState<P_AI_Task[] | null>(null)
  const [error , setError] = useState<boolean>(false)
  const [loading , setLoading] = useState<boolean>(false)
  const {taskDispatch} = useTaskContext()
  const {projectsDispatch, projectsState} = useProjectsContext()
  const [priority , setPriority] = useState<ProjectPriority>(ProjectPriority.Low)
  if(!state.authIsReady){return <></>}

  if(!state.user){
    router.push('/')
    return <></>
  }

  async function getAITasks(){
    try {
      setError(false)
      setLoading(true)
      const response = await fetch('/api/mock-api' , {
        method : 'POST',
        body : JSON.stringify({
          title : title,
          description : description,
          startTime : time.startTime, 
          endTime : time.endTime,
          startDay : dateState.displayDate,
          numberOfDays : noOfDays,
          letAIDecideTime : time.useTime
        })
      })
      const data : AI_Tasks_Response = await response.json()

      if((data as any).error){
        setError(true)
      }
      console.log(data)
      setLoading(false)
      setTasks(data.results)
    } catch(err){
      console.log(err)
      setError(true)
    }
  }

  async function addTasksToTimer(){
    let startDate = new Date(dateState.displayDate)
    const projectId = await projectsDispatch({
      type : 'ADD_PROJECT',
      payload : {
      title: title,
      description: description,
      startDate: startDate,
      deadline: new Date(startDate.getTime() + noOfDays * 24 * 60 * 60 * 1000),
      priority: priority,
      }
    })
    if(tasks){
      for(let i = 0 ; i < tasks.length ; i++){
        console.log('happening')
        await taskDispatch({
          type : 'ADD_TASK',
          payload : {
            title : tasks[i].title,
            description : tasks[i].description,
            date : new Date(tasks[i].date),
            startTime : tasks[i].startTime,
            endTime : tasks[i].endTime,
            tags : [],
            colour : colourOptions[0],
            projectId : projectId || 'none'
          }
        })
        console.log('added to tasks')
      }

      if(projectId){
        router.push(`/projects/${projectId}`)
      } else {
        router.push('/timer')
      }
      
    }
  }

  return (
    <div className=' '>
      <Header/>
      <div className='flex'>
        <Sidebar/>
        <div className='p-8 w-full mx-auto'>
          <h1 
            className='text-3xl text-zinc-800 font-semibold'>
              Create a Schedule using TrackIt AI
          </h1>
          <div className='mx-4 my-8 grid grid-cols-2 gap-x-8 gap-y-6'>
            <label className='w-full flex  order-1 flex-col gap-2'>
              Title
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Name of the task to make a schedule' 
                className='outline outline-1 outline-zinc-200 rounded-md py-1 px-2' />
            </label>
            <label className='w-full flex  order-3 flex-col gap-2'>
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={5} 
                wrap='none'
                placeholder='Describe the task to get a really good schedule' 
                className='outline outline-1  resize-none outline-zinc-200 rounded-md py-1 px-2' />
            </label>
            <label className= 'order-2 flex gap-2 flex-col'>
              Choose the starting day of the task
              <DatePicker/>
            </label>
            <div className= 'order-4 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                Choose start and end time for daily task
                <div className='flex items-center gap-4 justify-start'>
                <DropdownTime 
                  value={time.startTime} 
                  changeHandler={(value) => {
                    setTime(prev=> (
                      {...prev , startTime : value}
                      ))
                    }
                  }/>
                  <span>to </span>
                <DropdownTime
                  value={time.endTime} 
                  changeHandler={(value) => {
                    setTime(prev=> (
                      {...prev , endTime : value}
                      ))
                    }
                  }
                />
                </div>
              </div>
              <label className='flex items-center gap-2 cursor-pointer'>
                Let AI decide time?
                <input 
                  onChange={() => {
                    setTime(prev => (
                      {
                        ...prev , useTime : !prev.useTime
                      }
                    ))
                  }}
                  checked={time.useTime} 
                  type='checkbox' 
                  className='w-4 h-4 rounded-sm accent-black'
                />
              </label>
              <label className= 'order-6 flex gap-2 items-center'>
                Select number of days to schedule
                <input 
                  type='number' 
                  value={noOfDays}
                  onChange={e => setNoOfDays(Number(e.target.value))}
                  min={1} 
                  max={10} 
                  className='py-1 px-3 rounded-sm shadow-sm outline outline-1 outline-zinc-200' 
                />
              </label>
              <div className= 'order-8 flex justify-center mt-8' >
                <button 
                  disabled = {loading}
                  onClick={getAITasks}
                  className='text-lg pl-3 px-4 py-1 bg-zinc-950 disabled:bg-zinc-700 text-white rounded-md shadow-md flex items-center gap-1 '
                >
                  <Sparkles className='size-5'/>
                  Generate
                </button>
              </div>
              <PrioritySelector priority={priority} setPriority={setPriority}/>
            </div>
          </div>
          {
            loading && <AIPageLoader/>
          }
          {
            !loading && tasks && (
              <>
                <TaskTimeline centered tasks={tasks} />
                <div className='flex items-center gap-6 justify-center my-8'>
                  <button 
                    onClick={getAITasks}
                    className='py-2 px-4 rounded-md outline outline-1 flex gap-2 hover:bg-zinc-50 transition-all duration-200'
                  >
                    <Sparkles/>
                    Regenerate
                  </button>
                  <button
                    onClick={() => {addTasksToTimer()}} 
                    className='py-2 px-4 text-white bg-zinc-900 hover:bg-zinc-950 transition-all duration-200 rounded-md'>
                    Add to Calendar
                  </button>
                </div>
              </>
              
            )
          }
          {
            error && <p>Error occured. Try again later.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default TrackItAiPage