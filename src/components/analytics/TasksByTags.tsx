import { useTaskContext } from '@/context/TaskContext'
import { TAGS, tailwindColors } from '@/helpers/constansts'
import { countTagsByType } from '@/helpers/helper'
import { Tag, Tags } from '@/helpers/types'
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const TasksByTags = () => {
  const {tasksState} = useTaskContext()
  const [currentTag , setCurrentTag] = useState<string>(Object.keys(TAGS)[0])
  let graphData = countTagsByType(tasksState.tasks)
  return (
    <div className='mx-auto w-[90%] flex flex-col justify-center gap-6'>
      <div className='w-[100%] flex flex-wrap justify-center items-center gap-2 md:gap-6 py-2'>
      {
        Object.keys(TAGS as Tags).map(tagType => (
          <button 
            style={currentTag === tagType ? {
              background : tailwindColors[graphData[currentTag][0].background],
              outline : '1px solid black',
              color : 'white',
              transition : 'all 100ms'
            } : {}}
            key={tagType} 
            className={ `outline outline-1 outline-zinc-400 py-1 px-4 rounded-full`}
            onClick={() => {
              setCurrentTag(tagType)
            }}
          >
            {tagType}
          </button>
        ))
      }
      </div>
      <div className='h-96 py-2 px-6 outline outline-1 outline-zinc-200 rounded-md'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={graphData[currentTag]}
          >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tag" />
            <YAxis/>
            <Tooltip/>
            <Bar width={500} height={300} dataKey="count" fill="#1e40af">
              {
                graphData[currentTag].map((tag) => (
                  <Cell key={tag.tag} fill='#5b21b6' />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TasksByTags