'use client'
import Header from '@/components/Header'
import DisplayView from '@/calendar-components/DisplayView'
import { useAuthContext } from '@/hooks/useAuthContext'

import useFirestore from '@/hooks/useFirestore'
import { useRouter } from 'next/navigation'
import React from 'react'
import Sidebar from '@/components/Sidebar'

const App  = () => {
  const {state} = useAuthContext()
  const router = useRouter()

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
        <DisplayView />
      </div>
    </div>
  )
}

export default App 