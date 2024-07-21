'use client'
import Header from '@/components/Header'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useProjectsContext } from '@/context/ProjectContext'
import { monthDayYearFormatDate } from '@/helpers/helper'
import ProjectCreatorModal from '@/components/projects/ProjectCreatorModal'
import { Resp_Project } from '@/helpers/types'
import ProjectInfo from '@/components/projects/ProjectInfo'
import ProjectsTable from '@/components/projects/ProjectsTable'

const App  = () => {
  const {state} = useAuthContext()
  const router = useRouter()
  const {projectsState} = useProjectsContext()
  const [showCreateModal , setShowCreateModal] = useState(false)
  const [displayProject , setDisplayProject] = useState<Resp_Project | null>(projectsState.projects[0] || null)

  useEffect(() => {
    if(!displayProject && projectsState.projects.length > 0){
      setDisplayProject(projectsState.projects[0])
    }
  }, [projectsState.projects, displayProject])

  if(!state.authIsReady){return <></>}
  if(!state.user){
    router.push('/')
    return <></>
  }
  return (
    <div className='h-[100vh] h-[100dvh] '>
      <Header/>
      <div className='flex'>
      <Sidebar/>
        <div className='flex flex-col gap-4 w-full px-16 py-8 mb-8'>
          {projectsState.projects.length > 0 && displayProject && <div className='flex gap-4 justify-end'>
              <button 
                onClick={() => setShowCreateModal(true)}
                className='outline outline-1 py-2 px-4 outline-zinc-100 bg-zinc-800 text-white shadow-sm rounded-md h-fit'
              >
                Create Project
              </button>
          </div>}
        {
          projectsState.projects.length === 0 && (
            <div className='flex flex-col items-center mt-12 gap-4'>
              <div className='text-center'>
                <p className='text-zinc-700 text-2xl font-bold'>Haven&apos;t started a project yet?</p>
                <p className='text-zinc-600 text-xl font-semibold'>Create one now!</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className='outline outline-1 py-2 px-6 outline-zinc-100 bg-zinc-800 text-white shadow-sm rounded-md h-fit'
              >
                Create Project
              </button>
            </div>
          )
        }
        {
          projectsState.projects.length > 0 && (
            <ProjectsTable projects={projectsState.projects} />
          )
        }
        </div>
        {
          showCreateModal && <ProjectCreatorModal setShow={setShowCreateModal} />
        }
      </div>
    </div>
  )
}

export default App 