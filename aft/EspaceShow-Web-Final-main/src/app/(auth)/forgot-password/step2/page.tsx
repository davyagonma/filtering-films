"use client"
import { useToast } from "@/hooks/use-toast";
import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function ForgotStepOne() {
    const {toast} = useToast()
    const email = useSearchParams()?.get('email')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch(`/api/forgot-password?email=${email}`)
        const data = await response.json()
        if (data.success) {
            toast({
                title: "Réinitialisation du mot de passe",
                description: `${data.message}`,
                variant: "default"
            })
        }

        router.push(`/forgot-password/step3?email=${email}`)
    }

    if (!email || email === "") {
        return(
            <div className="flex justify-center items-center h-screen">
                <div>
                    <p className="my-4">Vous ne pouvez pas continuer sans la page précedente. Retourner rensigner l'email</p>
                    <Link href="/forgot-password" className={`rounded-lg text-center m-auto text-white text-sm hover:opacity-80 flex justify-center items-center p-3 w-[150px] cursor-pointer bg-[${colors.primary}] `}>
                        <button type="button">Retour</button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <section >
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" height={50} alt="Logo" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-20 m-5">
                <div>
                    <h2 className="text-center font-medium text-2xl mb-[30px]">Mot de passe oublié</h2>
                    <p className="mt-20 text-center text-sm">Obtenir un code de vérification pour <br className="md:hidden block" /> réinitialiser <br className="hidden md:block" />le mot de passe</p>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e as any)} autoComplete="false">
                            <div>
                                <div className="flex justify-center text-center items-center mt-10">
                                    {/* <input style={{ color: `${colors.primary}`, backgroundColor: `${colors.primary}` }} type="radio" defaultChecked /> */}
                                    <p className="ml-2">Par email à {email}</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-10">
                                <Link href="/forgot-password" className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "120px" }}>
                                    <button type="button">Précédent</button>
                                </Link>

                                <button className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5 cursor-pointer`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "120px" }} type="submit">Suivant</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>

    );
}
