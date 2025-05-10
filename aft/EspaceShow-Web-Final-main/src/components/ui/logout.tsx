"use client"
import { environmentUrl } from '@/utils/url'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {
    const email = JSON.parse(sessionStorage.getItem('user')!).email
    return (
        <button className='flex justify-between items-center w-full' onClick={ async () => {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:email}),
            })
            localStorage.clear()
            sessionStorage.clear()
            await signOut({
                redirect: true,
                callbackUrl: `${environmentUrl()}`, // changer en prod
            })

        }}>
            <span>Déconnexion</span>
            <LogOut size={15} className='text-slate-500'/>
        </button>
    )
}

export default Logout
