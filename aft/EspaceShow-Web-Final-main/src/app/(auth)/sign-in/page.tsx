"use client"
import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { colors } from "@/utils/constants"

export default function Login() {
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [process, setProcess] = useState<boolean>(false)

    const [check, setCheck] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email.trim() === '' || password.trim() === '') {
            toast({
                title: "Input fields error",
                description: "All input fields are required",
                variant: "destructive"
            })
            return
        }
        try {
            setProcess(true)
            // const signInData = await signIn('credentials', { email, password, redirect: false })
            const resp = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            if (!resp.ok) {
                const data = await resp.json()
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                })
                setProcess(false)
                return
            }
            await signIn('credentials', { email, password, redirect: false })
            
            // if (signInData?.error) {
            //     toast({
            //         title: "Error",
            //         description: signInData.error,
            //         variant: "destructive"
            //     })
            //     return
            // }
            const user = await fetch(`/api/user?email=${email}`)
            const userData = await user.json()
            if (!userData.success) {
                toast({
                    title: "Error",
                    description: "User not found",
                    variant: "destructive"
                })
                setProcess(false)
                return
            }
            const res = await fetch(`/api/notifications/lenght?userId=${userData?.user.id}`)
            const notificationsData = await res.json()
            if (!userData.success) {
                toast({
                    title: "Error",
                    description: "Error retrieving notifications",
                    variant: "destructive"
                })
                setProcess(false)
                return
            }
            sessionStorage.setItem('notif', `${notificationsData?.length}`)
            sessionStorage.setItem('user', JSON.stringify(userData?.user))

            window.location.href = localStorage.getItem('route') ? localStorage.getItem('route')! : '/'
            // router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
            setProcess(false)
        } finally {
            setProcess(false)
        }
    }

    const googleLogin = () => {
    toast({
        title: "Connexion avec Google",
        description: "Veuillez vous conecter avec votre mail et mot de passe pour le moment car cette fonctionnalité est en cours de développement.",
        variant: "default"
    })
    }


    return (
        <>
            <section className="select-none p-6" >
                <div className="flex justify-center md:justify-start ">
                    <Link href="/"><Image src="/logo.png" loading="lazy" alt="Logo" width={106} height={50} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
                </div>

                <div className="flex justify-center items-center mt-20">
                    <div>
                        <h2 className="text-center font-medium text-2xl mb-[30px]">Connexion</h2>
                        <div onClick={() => googleLogin()} className={`flex justify-center items-center rounded-lg px-5 py-1 cursor-pointer hover:opacity-65`} style={{ border: `1.5px solid ${colors.primary}` }} >
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.0338 20.4106 18.2644 22.5 15 22.5C10.8581 22.5 7.5 19.1419 7.5 15C7.5 10.8581 10.8581 7.5 15 7.5C16.9119 7.5 18.6513 8.22125 19.9756 9.39937L23.5112 5.86375C21.2787 3.78312 18.2925 2.5 15 2.5C8.09688 2.5 2.5 8.09688 2.5 15C2.5 21.9031 8.09688 27.5 15 27.5C21.9031 27.5 27.5 21.9031 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z" fill="#FFC107" />
                                <path d="M3.94141 9.18188L8.04828 12.1938C9.15953 9.4425 11.8508 7.5 15.0002 7.5C16.912 7.5 18.6514 8.22125 19.9758 9.39937L23.5114 5.86375C21.2789 3.78312 18.2927 2.5 15.0002 2.5C10.1989 2.5 6.03516 5.21062 3.94141 9.18188Z" fill="#FF3D00" />
                                <path d="M14.9992 27.5C18.228 27.5 21.1617 26.2644 23.3798 24.255L19.5111 20.9813C18.2139 21.9677 16.6289 22.5013 14.9992 22.5C11.748 22.5 8.98734 20.4269 7.94734 17.5338L3.87109 20.6744C5.93984 24.7225 10.1411 27.5 14.9992 27.5Z" fill="#4CAF50" />
                                <path d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.5714 18.8853 20.6833 20.0957 19.51 20.9819L19.5119 20.9806L23.3806 24.2544C23.1069 24.5031 27.5 21.25 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z" fill="#1976D2" />
                            </svg>
                            <p className="ml-2 text-sm">Continuez avec Google</p>
                        </div>

                        <div>
                            <p className="text-center mb-[30px] mt-[30px]">ou</p>
                        </div>

                        <div className="-mt-5">
                            <form onSubmit={(e) => handleSubmit(e as any)}>
                                <div><input required value={email} onChange={(e) => setEmail(e.target.value)} className={`flex justify-center items-center rounded-lg mt-10`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="email" placeholder="Email" /></div>
                                <div className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }} >
                                    <input required value={password} onChange={(e) => setPassword(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" />
                                    <div className="mr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (<Eye size={18} />) : (<EyeOff size={18} />)}
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-start gap-1 items-center">
                                    <input onClick={async() => {
                                        await setCheck(!check)
                                        await sessionStorage.setItem('role', check ? 'organisateur': "utilisateur")
                                    }} className="h-10 w-5" type="checkbox" id="check"/>
                                    <label htmlFor="check" className="text-sm">Se connecter en tant qu'organisateur</label>
                                </div>
                                <div className="text-right text-blue-500 mt-1 mb-3"> <Link className="text-sm mt-3 mb-9" href="/forgot-password">Mot de passe oublié ?</Link></div>
                                <div>
                                    <button className={`rounded-lg text-white text-sm hover:opacity-80`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '10px', width: "100%" }} type="submit">
                                        {process && <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-3" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>}
                                        Connexion</button>
                                </div>
                            </form>
                            <div>
                                <p className="pt-5">Vous n’avez pas de compte? <Link className="text-sm  text-blue-500" href="/sign-up"> Créer un compte</Link></p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
