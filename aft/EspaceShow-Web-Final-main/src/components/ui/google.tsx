import React from 'react'
import { Button } from "./button"
import Image from 'next/image'
import { signIn } from "next-auth/react"

const GoogleButton = ({text}:{text:string}) => {
    const googleAuth = () => signIn('google', { callbackUrl:'http://localhost:3000/' })
    return (
        <Button type='submit' onClick={googleAuth} className="w-full mt-5 p-2 gap-3 h-10" variant="outline">
            <Image src="/google.png" alt="" width={20} height={20} />
            {text}
        </Button>
    )
}

export default GoogleButton
