'use client'
import DatePicker from '@/calendar-components/DatePicker'
import DropdownTime from '@/calendar-components/DropdownTime'
import AIPageLoader from '@/components/AIPageLoader'
import Header from '@/components/Header'
import Sparkles from '@/components/icons/Sparkles'
import Sidebar from '@/components/Sidebar'
import TaskTimeline from '@/components/TaskTimeline'
import { useDateContext } from '@/context/DateContext'
import { AI_Tasks_Response, P_AI_Task } from '@/helpers/types'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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
            </div>
          </div>
          {
            loading && <AIPageLoader/>
          }
          {
            !loading && tasks && <TaskTimeline regenerate={getAITasks} tasks={tasks} />
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