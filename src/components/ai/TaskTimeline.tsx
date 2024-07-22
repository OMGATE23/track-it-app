'use client'
import { monthDayYearFormatDate, numberToTime } from '@/helpers/helper'
import { P_AI_Task } from '@/helpers/types'
import React from 'react'
import Sparkles from '../icons/Sparkles'
import { useTaskContext } from '@/context/TaskContext'
import { colourOptions } from '@/helpers/constansts'
import { useRouter } from 'next/navigation'

interface Props {
  tasks : P_AI_Task[]
  centered ?: boolean
}

const TaskTimeline = ({tasks , centered} : Props) => {
  const {taskDispatch} = useTaskContext()
  const router = useRouter()

  return (
    <div className={` w-fit ${centered && 'mx-auto'} fade-in-pop`}>
      {
        tasks.map((task , i) => (
          <div key={i +"."+task.title} className='flex items-start justify-start'>
            <div className='px-4 py-6 w-[120px] text-right relative'>
              {monthDayYearFormatDate(new Date(task.date))}
              <div className='size-4 bg-zinc-700 rounded-[50%] absolute top-[50%] translate-y-[-50%] left-[100%] translate-x-[-50%]' />
            </div>
            <div className='border-l border-zinc-400 max-w-[560px] py-6 px-4' >
              <p className='text-lg'>{task.title}</p>
              <p>{task.description}</p>
              <p>{numberToTime(task.startTime)} : {numberToTime(task.endTime)}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TaskTimeline