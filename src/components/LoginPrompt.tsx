'use client'
import useLogin from '@/hooks/useLogin'
import React from 'react'

const LoginPrompt = () => {
    const {login,error , isPending} = useLogin()
  return (
    <div className='bg-blue-50 h-[100vh] flex justify-center items-center'>
        <div className='w-[80%] md:w-fit shadow-md rounded-md bg-white flex flex-col items-center text-center gap-4 md:px-8 py-8'>
            <p className='text-xl'>Looks like you are not logged in</p>
            <button onClick={login} disabled = {isPending} className='bg-zinc-800 rounded-md py-1 px-3 text-white'>
                Login
            </button>
            {
                error && <p>Seems like an error occured. Try again</p>
            }
        </div>
    </div>
  )
}

export default LoginPrompt