'use client'
import { useAuthContext } from '@/hooks/useAuthContext'
import useLogin from '@/hooks/useLogin'
import useLogout from '@/hooks/useLogout'
import React from 'react'

const Header = () => {
    const {logout} = useLogout()
    const {login} = useLogin()
    const {state} = useAuthContext()
    const {user , authIsReady} = state

    if(!authIsReady) return <></>
  return (
    user ? (
        <header className='border-b border-neutral-200 h-16 flex items-center justify-between p-4'>
            <h1 className='text-xl font-semibold'>TrackIt</h1>
            <button className='hover:bg-neutral-100 transition-all duration-75 px-2 py-1 rounded-md' onClick={logout} >Logout</button>
        </header>
    ) : (
        <header >
            <p>TrackIt</p>
            <button onClick={login} >Login</button>
        </header>
    )
  )
}

export default Header