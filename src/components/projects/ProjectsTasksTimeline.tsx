import { monthDayYearFormatDate, numberToTime } from '@/helpers/helper'
import { Task } from '@/helpers/types'
import React from 'react'

interface Props {
  tasks : Task[]
}
const ProjectsTasksTimeline = ({tasks} : Props ) => {
  return (
    <div>
      {
        tasks.map((task , i) => (
          <div key={i +"."+task.title} className='flex items-start justify-start rounded-md'>
            <div className='px-4 py-6 w-[120px] text-right relative'>
              {monthDayYearFormatDate(new Date(task.date))}
              <div className=
                {`size-4 bg-zinc-700 rounded-[50%] absolute top-[50%] translate-y-[-50%] left-[100%] translate-x-[-50%]`}
              />
            </div>
            <div className={`border-l border-zinc-600 max-w-[560px] py-6 px-4  w-[320px]`} >
              <p className='text-lg'>{task.title}</p>
              <p>{task.description}</p>
              <p>{numberToTime(task.startTime)} : {numberToTime(task.endTime)}</p>
            </div>
          </div>
        ))
      }
      {
        tasks.length === 0 && <p className='text-zinc-500'>No tasks done under this project ...yet</p>
      }
    </div>
  )
}

export default ProjectsTasksTimeline