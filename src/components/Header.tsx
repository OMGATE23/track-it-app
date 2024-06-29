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
        <header>
            <p>Hi {user.displayName}</p>
            <button onClick={logout} >Logout</button>
        </header>
    ) : (
        <header>
            <p>TrackIt</p>
            <button onClick={login} >Login</button>
        </header>
    )
  )
}

export default Header