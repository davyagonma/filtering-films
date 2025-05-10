"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


export default function Password() {
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const {toast} =  useToast()
    const { data: session } = useSession()
    const [type, setType] = useState(true)
    const [type2, setType2] = useState(true)
    const [type3, setType3] = useState(true)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confNewPassword, setConfNewPassword] = useState("");

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        if (!oldPassword ||!newPassword ||!confNewPassword) {
            toast({
                title: "Erreur",
                description: "Veuillez saisir tous les champs",
                variant: "destructive"
            })
            return
        }
        if (newPassword.length < 8) {
            toast({
                title: "Erreur",
                description: "Votre mot de passe doit contenir au moins 8 caractères",
                variant: "destructive"
            })
            return
        }

        if (newPassword!== confNewPassword) {
            toast({
                title: "Erreur",
                description: "Les nouveaux mots de passe ne correspondent pas",
                variant: "destructive"
            })
            return
        }

        const data = { email: user?.email!, oldPassword: oldPassword, newPassword: newPassword }
        const res = await fetch('/api/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            const data = await res.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive"
            })
        }
        toast({
            title: "Succès",
            description: "Votre mot de passe a été modifié avec succès",
            variant: "default"
        })
        setOldPassword("")
        setNewPassword("")
        setConfNewPassword("")
        
    }


    return (
        <>
        <Navbar/>
            <section className="p-5 pt-[100px] ml-2 md:ml-0 h-[70vh] md:h-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[170px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Mot de passe</p>
                        <p className="mt-3 text-lg md:text-xl">Modifiez votre mot de passe de connexion</p>
                        <div>
                            <LoginFirst route={"/account/settings/password"} />
                            {session?.user && (
                                <div>
                                    <form onSubmit={(e) => handleSubmit(e as any)}>
                                        <div className="pt-3">
                                            <p className="pt-2 pb-1">Ancien mot de passe</p>
                                            <div className={`flex justify-center items-center rounded-lg`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }} >
                                                <input required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={type ? "text" : "password"} />
                                                {type && (
                                                    <IoMdEye size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType(!type)} />
                                                )}
                                                {!type && (
                                                    <IoMdEyeOff size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType(!type)} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="pt-3">
                                            <p className="pt-2 pb-1">Nouveau mot de passe</p>
                                            <div className={`flex justify-center items-center rounded-lg`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }} >
                                                <input required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={type2 ? "text" : "password"} />
                                                {type2 && (
                                                    <IoMdEye size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType2(!type2)} />
                                                )}
                                                {!type2 && (
                                                    <IoMdEyeOff size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType2(!type2)} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="pt-3">
                                            <p className="pt-2 pb-1">Confirmer mot de passe</p>
                                            <div className={`flex justify-center items-center rounded-lg`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', width: "100%", backgroundColor: "transparent" }} >
                                                <input required value={confNewPassword} onChange={(e) => setConfNewPassword(e.target.value)} className={`flex justify-center items-center rounded-lg`} style={{ outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type={type3 ? "text" : "password"} />
                                                {type3 && (
                                                    <IoMdEye size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType3(!type3)} />
                                                )}
                                                {!type3 && (
                                                    <IoMdEyeOff size={23} className="m-2 opacity-70 cursor-pointer" onClick={() => setType3(!type3)} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center mt-5">
                                            <button className="bg-[#C30F66] pl-7 rounded-lg cursor-pointer pr-7 text-white p-2 " type="submit">Modifier</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
