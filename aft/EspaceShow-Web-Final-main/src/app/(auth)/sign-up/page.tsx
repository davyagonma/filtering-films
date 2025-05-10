"use client"
import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { colors } from "@/utils/constants"


export default function Register() {
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPassword2, setShowPassword2] = React.useState(false)

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [contact, setContact] = useState('');
    const [password_confirmation, setPasswordConfirm] = useState("");

    const [check1, setCheck1] = useState('false')
    const [process, setProcess] = React.useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const register = { nom, prenom, email, contact, password }
        if (nom.trim() === '' || prenom.trim() == '' || email.trim() === '' || password.trim() === '') {
            toast({
                title: "Input fields error",
                description: "All input fields are required",
                variant: "destructive"
            })
            return
        }
        try {
            setProcess(true)
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(register),
            })
            if (response.ok) {
                router.push(`/verification?email=${email}`)
            } else {
                const data = await response.json()
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                })
            }
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

    return (
        <section className="select-none p-3">
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" alt="Logo" height={50} loading="lazy" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-10">
                <div>
                    <h2 className="text-center font-medium text-2xl mb-[30px]">Inscription</h2>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e as any)} autoComplete="false" className="mb-30" style={{ margin: '15px', marginBottom: '40px' }}>
                            <div><input required value={nom} onChange={(e) => setNom(e.target.value)} className={`flex justify-center items-center rounded-lg mt-10`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="Text" placeholder="Nom" /></div>
                            <div><input required value={prenom} onChange={(e) => setPrenom(e.target.value)} className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="Text" placeholder="Prénom" /></div>

                            <div><input required value={contact} onChange={(e) => setContact(e.target.value)} className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="tel" placeholder="Contact:+22900000000" /></div>
                            <div><input required value={email} onChange={(e) => setEmail(e.target.value)} className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="email" placeholder="Email" /></div>
                            <div className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }}>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={showPassword ? "text" : "password"} placeholder="Mot de passe" />
                                <div className="mr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (<Eye size={18} />) : (<EyeOff size={18} />)}
                                </div>
                            </div>

                            <div className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }}>
                                <input required value={password_confirmation} onChange={(e) => setPasswordConfirm(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={showPassword2 ? "text" : "password"} placeholder="Confirmation mot de passe" />
                                <div className="mr-3 cursor-pointer" onClick={() => setShowPassword2(!showPassword2)}>
                                    {showPassword2 ? (<Eye size={18} />) : (<EyeOff size={18} />)}
                                </div>
                            </div>

                            <div className="flex justify-start items-center mt-3">
                                <input value={check1} required onChange={() => setCheck1(check1 == "true" ? 'false' : 'true')} type="checkbox" />
                                <span className="ml-2 text-sm"> <Link href="/conditions" style={{ fontSize: '13px' }}>Politiques d’utilisation et de confidentialité</Link></span>
                            </div>
                            <div className="mt-3 mb-4 flex justify-start items-center">
                                <input defaultChecked required type="checkbox" />
                                <span className="ml-2 text-sm"><Link href="#" style={{ fontSize: '13px' }}>Recevoir des mails provenant de la plateforme</Link></span>
                            </div>
                            <div>
                                <button disabled={check1 == 'false' ? true : false} className={`rounded-lg text-white text-sm hover:opacity-80`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '10px', width: "100%", cursor: `${check1 == 'false' ? 'not-allowed' : 'pointer'}`, opacity: `${check1 == 'false' ? '.5' : '1'}` }} type="submit">
                                    {process && <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-3" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>}
                                    S'inscrire</button>
                            </div>
                        </form>

                        <div>
                            <p className="p-5 -mt-5 mb-2">Déjà un compte? <Link className="text-sm  text-blue-500" href="/sign-in"> Se connecter</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
