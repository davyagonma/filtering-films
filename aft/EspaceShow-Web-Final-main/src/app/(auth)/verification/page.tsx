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
    const router = useRouter()
    const email = useSearchParams()?.get('email')
    const otp = useSearchParams()?.get('otp')!

    const [code, setCode] = useState(otp ? otp : '')
    // console.log(code)
    const handleOnChange = (res: string) => {
        setCode(res);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (code.trim() === '') {
            toast({
                title: "Input field error",
                description: "Code de confirmation est requis",
                variant: "destructive"
            })
            return
        }
        try {
            const response = await fetch('/api/auth/verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, otp: code }),
            });
            if (response.ok) {
                toast({
                    title: "Succès",
                    description: "Code de vérification valide",
                    variant: "default"
                });
                router.push('/verification/success');
            } else {
                const data = await response.json();
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
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
                <div className="m-5">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mt-5 mb-10">Vérification</h2>
                        <p className="mb-10">Un code de confirmation vous a été <br className="md:hidden block" />  envoyé à l’adresse <br />
                            <b>{email}</b>
                            <br />Veuillez consulter votre boite principale <br className="md:hidden block" />  ou vos spams et entrez
                            le code <br className="md:hidden block" />  à 5 chiffres puis cliquez sur envoyer.
                        </p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e as any)}>
                        <div className="flex justify-center items-center mb-10">
                            <AuthCode inputClassName="w-12 h-12 text-xl border-2 border-[#C30F66] rounded-lg text-center m-1 outline-none" autoFocus allowedCharacters='numeric' length={5} onChange={handleOnChange} />
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="text-white rounded-lg" style={{ backgroundColor: `${colors.primary}`, padding: '13px 30px 13px 30px' }} type="submit">Envoyer</button>
                        </div>
                    </form>
                    <div>
                        <p className="text-center mt-10">Vous n’avez pas reçu de code ? <Link href="#" onClick={() => { }}>Renvoyer le code</Link> </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Verification
