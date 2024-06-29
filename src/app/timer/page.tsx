'use client'
import Header from '@/components/Header'
import { useAuthContext } from '@/hooks/useAuthContext'

import useFirestore from '@/hooks/useFirestore'
import React from 'react'

const App  = () => {
  const {state} = useAuthContext()
    const {addDemo} = useFirestore()

  if(!state.authIsReady){return <>Auth is not ready</>}

  if(state.authIsReady && !state.user){
    return <>User not ready</>
  }
  return (
    <div>
      <Header/>
      App of greatness
      <button onClick={addDemo}>Add demo</button>
    </div>
  )
}

export default App 