"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { colors } from "@/utils/constants";
import { GetAllCountries } from "@/utils/countries/countries";
import { ICountry } from "country-state-city";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function Retrait() {
    const { data: session } = useSession()
    const eventId = useSearchParams().get('id')
    const [montant, setMontant] = useState<any>("");
    const [moyen, setMoyen] = useState("MTN");
    const [current, setCurrrent] = useState("+229");
    const [phone, setPhone] = useState("");
    const [titulaire, setTitulaire] = useState("");
    const [phoneConf, setPhoneConf] = useState("");

    const country: ICountry[] = GetAllCountries()
    // console.log(country)


    const { toast } = useToast()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null;
    const router = useRouter()

    const handleSumbit = async (e: Event) => {
        e.preventDefault()
        const data = {
            userId: user?.id,
            montant: montant,
            moyen: moyen,
            phone_number: current + phoneConf,
            titulaire: titulaire,
            eventId: eventId
        }
        if (!phone || !montant || !moyen || !current || !titulaire || !phoneConf) {
            toast({ title: "Tous les champs sont requis", variant: "destructive" })
        }
        if (phone !== phoneConf) {
            toast({ title: "Les numéros ne sont pas conformes", variant: "destructive" })
        }
        const response = await fetch('/api/transactions/retrait', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const data = await response.json()
            toast({ title: data.message, variant: "destructive" })
        } else {
            toast({ title: "Retrait enrégistré avec succès", variant: "default" })
            router.push(`/finances/retrait/confirmation/step1`)
        }

        // router.push('/finances/retrait/confirmation/step1')
        // console.log(data)
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] " style={{ minHeight: '70vh' }}>
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[150px] w-[100%] md:w-[500px]">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Retrait</p>
                        <div>
                            <LoginFirst route={"/finances/retrait"} />
                            {session?.user && (
                                <div>
                                    <form onSubmit={(e) => handleSumbit(e as any)}>
                                        <div className="md:flex justify-between items-center w-full mt-6 text-sm">
                                            <p className="mb-1 md:mb-0 md:w-[330px] ">Montant</p>
                                            <input value={montant} onChange={(e) => setMontant(e.target.value)} className="rounded-lg p-2 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} type="text" placeholder="Montant" />
                                        </div>
                                        <div className="md:flex justify-between items-center w-full mt-6 text-sm">
                                            <p className="mb-1 md:mb-0 md:w-[330px] ">Méthode de retrait</p>
                                            <select className="rounded-lg p-2 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }}>
                                                <option defaultChecked value="MTN">MTN Mobile Money</option>
                                            </select>
                                        </div>
                                        <div className="md:flex justify-between items-center w-full mt-6 text-sm ">
                                            <p className="mb-1 md:mb-0 md:w-[325px] ">Numéro</p>
                                            <div className="flex justify-start items-center rounded-lg w-full" style={{ border: `2px solid ${colors.primary}` }}>
                                                <select value={current} onChange={(e) => setCurrrent(e.target.value)} className="p-1 w-[65px] " style={{ outline: 'none' }}>
                                                    <option defaultChecked value="+229">+229</option>
                                                    {country.map((phoneCode, idx) => (
                                                        <React.Fragment key={idx}>
                                                            {phoneCode.phonecode.split("-")[0].split('+').join("") !== '1' && (
                                                                <option key={idx} value={`+${phoneCode.phonecode.split("-")[0].split('+').join("").trim()}`}>+{phoneCode.phonecode.split("-")[0].split('+').join("").trim()}</option>
                                                            )}
                                                        </React.Fragment>
                                                    ))}

                                                </select>
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="90 00 00 00" style={{ outline: 'none', overflow: 'hidden' }} className="p-2 w-full rounded-lg" type="tel" />
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between items-center w-full mt-6 text-sm ">
                                            <p className="mb-1 md:mb-0 md:w-[325px] ">Confirmation du Numéro</p>
                                            <div className="flex justify-start items-center rounded-lg w-full" style={{ border: `2px solid ${colors.primary}` }}>
                                                <select value={current} onChange={(e) => setCurrrent(e.target.value)} className="p-1 w-[65px] " style={{ outline: 'none' }}>
                                                    <option value={current}>{current}</option>
                                                </select>
                                                <input value={phoneConf} onChange={(e) => setPhoneConf(e.target.value)} placeholder="90 00 00 00" style={{ outline: 'none', overflow: 'hidden' }} className="p-2 w-full rounded-lg" type="tel" />
                                            </div>
                                        </div>
                                        <div className="md:flex justify-between items-center w-full mt-6 text-sm">
                                            <p className="mb-1 md:mb-0 md:w-[330px] ">Titulaire</p>
                                            <input value={titulaire} onChange={(e) => setTitulaire(e.target.value)} className="rounded-lg p-2 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} type="text" placeholder="Nom et prénom " />
                                        </div>

                                        <div className="flex justify-center items-center text-center mt-8">
                                            <button className={`bg-[${colors.primary}] p-2 text-white pl-7 pr-7 rounded-lg`} type="submit">Valider</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
