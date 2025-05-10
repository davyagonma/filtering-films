"use client"
import React, { useState } from 'react'
import { colors } from '@/utils/constants';
import AuthCode from 'react-auth-code-input';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


const Verification = () => {
    const { toast } = useToast()
    const email = useSearchParams()?.get('email')
    const router = useRouter()
    const [code, setCode] = useState('')
    const handleOnChange = (res: string) => {
        setCode(res);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (code.trim() === '') {
            toast({
                title: "Erreur",
                description: "Code de confirmation est requis",
                variant: "destructive"
            })
            return
        }

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:email,code:code }),
            });
            if (response.ok) {
                toast({
                    title: "Succès",
                    description: "Code de vérification valide",
                    variant: "default"
                });
                // router.push('/verification/success');
                router.push(`/reinitialisation?email=${email}`)
            } else {
                const data = await response.json();
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
                setCode('')
            }
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur s'est produite",
                variant: "destructive"
            });
        }
    }
    return (
        <section >
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" alt="Logo" height={50} width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>
            <div className="flex justify-center items-center mt-0">
                <div className="md:m-20 m-2">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mt-5 mb-10">Vérification</h2>
                        <p className="mb-10">Veuillez saisir le code qui vous est envoyé</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e as any)}>
                        <div className="flex justify-center items-center mb-10">
                            <AuthCode inputClassName="w-12 h-12 text-xl border-2 border-[#C30F66] rounded-lg text-center m-1 outline-none" autoFocus allowedCharacters='numeric' length={5} onChange={handleOnChange} />
                        </div>
                        <div className="flex gap-6 justify-center items-center">
                            <Link href={'/forgot-password'}>
                                <button className="text-white rounded-lg" style={{ backgroundColor: `${colors.primary}`, padding: '13px 30px 13px 30px' }} type="button">Retour</button>
                            </Link>
                            <button className="text-white rounded-lg" style={{ backgroundColor: `${colors.primary}`, padding: '13px 30px 13px 30px' }} type="submit">Suivant</button>
                        </div>
                    </form>
                    {/* <div>
                        <p className="text-center mt-10">Vous n’avez pas reçu de code ? <Link href="#" onClick={() => { }}>Renvoyer le code</Link> </p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Verification
