import { monthDayYearFormatDate, priorityStyling, statusStyling } from '@/helpers/helper';
import { ProjectPriority, ProjectStatus, Resp_Project } from '@/helpers/types'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
  projects : Resp_Project[]
}

const ProjectsTable = ({projects} : Props) => {
  const router = useRouter()

  
  return (
    <table className='mt-8'>
      <thead className='border-b rounded-md border-zinc-300'>
        <tr>
          <th className='py-1 font-normal text-zinc-800'>Project Title</th>
          <th className='py-1 font-normal text-zinc-800'>Description</th>
          <th className='py-1 font-normal text-zinc-800'>Start Date</th>
          <th className='py-1 font-normal text-zinc-800'>Deadline</th>
          <th className='py-1 font-normal text-zinc-800'>Priority</th>
          <th className='py-1 font-normal text-zinc-800'>Status</th>
        </tr>
      </thead>
      <tbody>
      {projects.map((project) => (
          <tr 
            key={project.id}
            className='border-b py-4 my-1 border-zinc-200 hover:bg-zinc-100 cursor-pointer' 
            onClick={() => {
              router.push(`/projects/${project.id}`)
            }}
          >
            <td className=' py-2 text-center font-[500]'>{project.title || '(No Title)'}</td>
            <td className=' py-2 text-ellipsis max-w-[120px] overflow-x-hidden'>{project.description}</td>
            <td className=' py-2 text-center'>{monthDayYearFormatDate(project.startDate)}</td>
            <td className=' py-2 text-center'>{monthDayYearFormatDate(project.deadline)}</td>
            <td 
              className={`
                py-2 text-center mx-auto
              `}
            >
              <span className={`${priorityStyling(project.priority)} text-white px-4 py-1 rounded-full`}>
                {project.priority}
              </span>
            </td>
            <td 
              className={`
                py-2 text-center mx-auto
              `}
            >
              <span className={`${statusStyling(project.status)} text-white px-4 py-1 rounded-full`}>
                {project.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable