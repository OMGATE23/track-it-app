'use client'
import Header from '@/components/Header'
import ProjectInfo from '@/components/projects/ProjectInfo'
import Sidebar from '@/components/Sidebar'
import { useProjectsContext } from '@/context/ProjectContext'
import { Resp_Project } from '@/helpers/types'
import { useAuthContext } from '@/hooks/useAuthContext'
import { notFound, redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
  params : {
    projectId : string
  }
}

const ProjectDetail = ({params} : Props) => {
  const {projectsState} = useProjectsContext()
  const [project , setProject] = useState<Resp_Project>()

  useEffect(() => {
    setProject(projectsState.projects.find(p => p.id === params.projectId))
  }, [projectsState, params.projectId])
  return (
    <div className=' '>
      <Header/>
      <div className='flex'>
      <Sidebar/>
      {project && <ProjectInfo project={project} />}
    </div>
    </div>
  )
}

export default ProjectDetail