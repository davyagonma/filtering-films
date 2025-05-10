"use client"
import { useToast } from "@/hooks/use-toast";
import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Reinitialisation() {
    const router = useRouter()
    const {toast} =  useToast()
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const email = useSearchParams()?.get('email')

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        if (!password || !password_confirm) {
            toast({
                title: "Erreur",
                description: "Veuillez saisir tous les champs",
                variant: "destructive"
            })
            return
        } 
        if (password!== password_confirm) {
            toast({
                title: "Erreur",
                description: "Les mots de passe ne correspondent pas",
                variant: "destructive"
            })
            return
        }
        if (password.length < 8) {
            toast({
                title: "Erreur",
                description: "Votre mot de passe doit contenir au moins 8 caractères",
                variant: "destructive"
            })
            return
        }
        const data = { email, password }
        const response = await fetch('/api/forgot-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const error = await response.json()
            toast({
                title: "Erreur",
                description: error.message,
                variant: "destructive"
            })
            return
        }
        toast({
            title: "Succès",
            description: "Votre mot de passe a été réinitialisé avec succès",
            variant: "default"
        })

        router.push('/forgot-password/success')
    }


    return (
        <section className="select-none">
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" height={50} alt="Logo" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-20">
                <div>
                    <h2 className="text-center font-medium text-2xl mb-[30px]">Réinitialisation du mot de<br className="block md:hidden" />passe</h2>

                    <div>
                        <form onSubmit={(e) => handleSubmit(e as any)} autoComplete="false">
                            <div className="mt-20"><input autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} className={`flex justify-center items-center rounded-lg mt-10`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="text" placeholder="Nouveau mot de passe" /></div>
                            <div><input required value={password_confirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={`flex justify-center items-center rounded-lg mt-7`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', width: "100%", backgroundColor: "transparent" }} type="text" placeholder="Confirmer le mot de passe" /></div>
                            <div className="mt-10 flex justify-center items-center">
                                <button className={`rounded-lg text-white text-sm hover:opacity-80`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '10px', width: "auto", paddingLeft: '40px', paddingRight: '40px' }} type="submit">Valider</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>

    );
}
