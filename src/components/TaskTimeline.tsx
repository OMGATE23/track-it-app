import { monthDayYearFormatDate, numberToTime } from '@/helpers/timefunctions'
import { AI_Tasks_Response, P_AI_Task } from '@/helpers/types'
import React from 'react'
import Sparkles from './icons/Sparkles'

interface Props {
  tasks : P_AI_Task[]
  regenerate : () => Promise<void>
}

const TaskTimeline = ({tasks , regenerate} : Props) => {
  return (
    <div className=' w-fit mx-auto fade-in-pop'>
      {
        tasks.map((task , i) => (
          <div key={i +"."+task.title} className='flex items-start justify-start'>
            <div className='px-4 py-8 w-[120px] text-right relative'>
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
      <div className='flex items-center gap-6 justify-center my-8'>
        <button 
          onClick={regenerate}
          className='py-2 px-4 rounded-md outline outline-1 flex gap-2 hover:bg-zinc-50 transition-all duration-200'
        >
          <Sparkles/>
          Regenerate
        </button>
        <button className='py-2 px-4 text-white bg-zinc-900 hover:bg-zinc-950 transition-all duration-200 rounded-md'>
          Add to Calendar
        </button>
      </div>
    </div>
  )
}

export default TaskTimeline