"use client"
import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Forgot() {
    const [moyen, setMoyen] = useState('')
    const router = useRouter()
    const handleSubmit = (e: Event) => {
        e.preventDefault()
        router.push(`/forgot-password/step2?email=${moyen}`)
    }


    return (
        <>
            <section >
                <div className="flex justify-center md:justify-start ">
                    <Link href="/"><Image height={50} src="/logo.png" alt="Logo" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
                </div>

                <div className="flex justify-center items-center mt-20">
                    <div>
                        <h2 className="text-center font-medium text-2xl mb-[30px]">Mot de passe oublié</h2>
                        <div>
                            <form onSubmit={(e) => handleSubmit(e as any)} autoComplete="false">
                                <div >
                                    <p className="md:mt-20 mt-10 text-center text-sm">Veuillez entrer votre adresse email <br /> associé à votre compte Espace Show+</p>
                                </div>
                                <div className="m-auto flex justify-center items-center ml-10 mr-10">
                                    <input required value={moyen} onChange={(e) => setMoyen(e.target.value)} className={`flex justify-center items-center rounded-lg mt-10 w-full`} style={{ border: `1.5px solid ${colors.primary}`, outline: 'none', padding: '7px', backgroundColor: "transparent" }} type="email" placeholder="Email" /></div>
                                <div className="flex ml-10 mr-10 m-auto justify-center items-center mt-10">
                                    <Link href="/sign-in" className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "120px" }}>
                                        <button type="button">Précédent</button>
                                    </Link>

                                    <button className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5 cursor-pointer`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "120px" }} type="submit">Suivant</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>

    );
}
