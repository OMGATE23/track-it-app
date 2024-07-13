'use client'
import DatePicker from '@/calendar-components/DatePicker'
import DropdownTime from '@/calendar-components/DropdownTime'
import Header from '@/common-components/Header'
import Sidebar from '@/common-components/Sidebar'
import React, { useState } from 'react'

const TrackItAiPage = () => {
  const [title , setTitle] = useState('')
  const [time , setTime] = useState({
    startTime : 1020,
    endTime : 1050,
    useTime : true
  })
  return (
    <div className=' '>
      <Header/>
      <div className='flex'>
        <Sidebar/>
        <div className='p-8 w-full'>
          <h1 
            className='text-3xl text-zinc-800 font-semibold'>
              Create a Schedule using Trackit AI
          </h1>
          <div className='mx-4 my-8 grid grid-cols-2 gap-6'>
            <label className='w-full flex order-1 flex-col gap-2'>
              Title
              <input 
                placeholder='Name of the task to make a schedule' 
                className='outline outline-1 w-[80%] max-w-[480px] outline-zinc-200 rounded-md py-1 px-2' />
            </label>
            <label className='w-full flex order-3 flex-col gap-2'>
              Description
              <textarea
                rows={5} 
                wrap='none'
                placeholder='Name of the task to make a schedule' 
                className='outline outline-1 w-[80%] resize-none max-w-[480px] outline-zinc-200 rounded-md py-1 px-2' />
            </label>
            <label className='order-2 flex gap-2 flex-col'>
              Choose the starting day of the task
              <DatePicker className='order-2'/>
            </label>
            <div className='order-4 flex flex-col gap-4'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackItAiPage