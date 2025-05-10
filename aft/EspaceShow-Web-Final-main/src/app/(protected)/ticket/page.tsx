"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginFirst from "@/components/components/LoginFirst";
import { UserProps } from "@/types/interfaces";
import { useToast } from "@/hooks/use-toast"
import { useKKiaPay } from 'kkiapay-react';
import { FEEX_KEY } from "@/utils/constants";
import { environmentUrl } from "@/utils/url";
import Feexpay from "@feexpay/react-sdk"

export default function Tickets() {
    const { toast } = useToast()
    const router = useRouter()
    const user: UserProps = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const eventId = useSearchParams()?.get('eventId')
    const [paiement, setPaiement] = useState('MTN')
    const [nom, setNom] = useState(user ? user.nom : "")
    const [prenom, setPrenom] = useState(user ? user.prenom : "")
    const [email, setEmail] = useState(user ? user.email : "")
    const [type, setType] = useState('')
    const [tel, setTel] = useState("")
    const [typeTicket, setTypeTicket] = useState<string[]>([])
    const [details, setDetails] = useState<string[]>([])
    const [selectedTicket, setSelectedTicket] = useState<{ label: string, price: number } | null>(null)

    const { openKkiapayWidget, addKkiapayListener } = useKKiaPay();

    useEffect(() => {
        fetch(`/api/TypeTicket?eventId=${eventId}`)
            .then(res => res.json())
            .then(data => {
                 console.log(data)
                setTypeTicket(data.ticket)
                setDetails(data.details)
            })
            .catch(error => console.error(error))
    }, [])

    const createTicket = async () => {
        const data = { "nom": nom, "prenom": prenom, "eventId": eventId, "email": email, "type_ticket": type.split('-')[0], price: type.split('-')[1], "moyen": paiement, "userId": user.id! }
        const res = await fetch('/api/reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            const data = await res.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Réservation réussie",
                description: "Votre réservation a été effectuée avec succès!",
                variant: "default"
            })
            setType('')
            await router.push('/notification')
        }
    }
    const amount = type && type.includes('-')
  ? parseFloat(type.split('-')[1].replace(/[^\d.]/g, ''))
  : 0;

    // const amount = Number(amounte.toString().replace(/[^\d]/g, ""))


    // async function open(email: string, amount: number, name: string) {
    //     openKkiapayWidget({
    //         amount: amount,
    //         api_key: KKIA_KEY,
    //         // api_key: "a69e8bf0a72d11efa320b5bee5c50769",
    //         email: email,
    //         // sandbox: true,
    //         callback: environmentUrl(),
    //         name: `${name}`,
    //     });
    //     addKkiapayListener('failed', (response) => {
    //         toast({
    //             title: "Échec de la réservation",
    //             description: "La réservation a échoué. Veuillez réessayer.",
    //             variant: "destructive"
    //         })
    //     });
    //     addKkiapayListener('success', async (response) => {
    //         await createTicket()
    //     });
    // }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const data = { "nom": nom, "prenom": prenom, "eventId": eventId, "email": email, "type_ticket": type.split('-')[0], price: type.split('-')[1], "moyen": paiement, "userId": user.id!}
        const feexpay = document.getElementById('67b8f8137a6214f1a462628c')
        // await open(email, parseFloat(type.split('-')[1]), `${prenom} ${nom}`)
        feexpay!.click();
        await createTicket()
    }

    const moyens = [
        {
            moyen: 'MTN',
            img: '/kkiapay.png'
        },
        // {
        //     moyen: 'MOOV',
        //     img: '/mtn-logo.jpg'
        // },
    ]

    
    return (
        <>
            <Navbar />
            <LoginFirst route={`/ticket?eventId=${eventId}`} />

            {typeTicket?.length !== 0 && (
                <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-[90px] md:py-[100px]">
                    <p className="text-center font-bold text-xl text-[#C30F66]">Réserver un ticket</p>
                    <div className="md:bg-[#F8F9FA] w-full md:w-[50%]" style={{ padding: '25px', borderRadius: '20px', }}>
                        <p className="text-center md:text-justify">1. Informations du ticket</p>
                        <div>
                            <form className="flex flex-col justify-center items-center m-[auto] mt-5">
                                <input required value={nom} onChange={(e) => setNom(e.target.value)} className="w-[100%] md:w-[60%] p-2 mb-4 rounded-lg" style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" placeholder="Nom" />
                                <input required value={prenom} onChange={(e) => setPrenom(e.target.value)} className="w-[100%] md:w-[60%] p-2 mb-4 rounded-lg" style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" placeholder="Prénoms" />
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-[100%] md:w-[60%] p-2 mb-4 rounded-lg" style={{ outline: 'none', border: '2px solid #C30F66' }} type="email" placeholder="Adresse de réception(Exemple@gmail.com" />
                                <select required value={type} onChange={(e) => setType(e.target.value)} className="w-[100%] md:w-[60%] p-[10px] mb-4 rounded-lg" style={{ outline: 'none', border: '2px solid #C30F66' }}>
                                    <option value="" defaultValue={"Type de tiket"}>Type de ticket</option>
                                    {details.map((ticket, idx) => (
                                        <option key={idx} value={`${ticket[0]}-${ticket[1]}`}>{ticket[0]}</option>
                                    ))}
                                </select>
                                
                            </form>
                        </div>
                        <p className="text-center md:text-justify mt-4">2. Moyen de paiement</p>
                        <div>
                            <p className="text-center mt-10 mb-5">Choisissez votre opérateur</p>
                            <div className="flex justify-center items-center">
                                {moyens.map((moyen, idx) => (
                                    <div className="cursor-pointer overflow-hidden rounded-sm m-3 w-[60px] md:w-[auto] " style={{ border: `${paiement == moyen.moyen ? '1px solid rgba(195, 15, 102, .3)' : ""}` }} key={idx} onClick={() => setPaiement(moyen.moyen)}>
                                        <Image alt="" height={70} src={moyen.img} width={70} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {details.map((det, idx) => (
                            <p key={idx} className="text-center m-2">
                                {det[0] === type.split('-')[0] && (
                                    <span>Ticket {type.split('-')[0]}: {Number(det[1].toString().replace(/[^\d]/g, ""))}<span className="text-[#C30F66] pl-1">FCFA</span></span>
                                )}
                            </p>
                        ))}

                        <div className="flex justify-center items-center mt-10">
                           
                            <Feexpay
                                key={type} // Force le widget à se recharger quand le ticket change
                                token={FEEX_KEY}
                                id="67b8f8137a6214f1a462628c"
                                amount={amount}
                                description="Achat de ticket"
                                callback={(response) => {
                                    if (response?.status === "SUCCESSFUL") { // ou selon le champ que Feexpay te donne
                                        toast({ title: "Paiement validé", description: "Création du ticket en cours...", variant: "default" });
                                        createTicket(); // Création du ticket après validation
                                    } else {
                                        toast({ title: "Paiement échoué", description: "Le paiement n’a pas été validé.", variant: "destructive" });
                                    }
                                
                                }}
                                callback_url={environmentUrl()}
                                callback_info="Achat ticket"
                                buttonText="Payer le ticket"
                                buttonClass="bg-[#C30F66] text-white text-center p-2 w-[100%] md:w-[60%] rounded-lg"
                                defaultValueField={{ 'country_iban': "BJ", 'network': paiement }}
                                currency="FCFA"
                                />

                        </div>
                    
                    </div>
                </section>
            )}
            <Footer />
        </>
    );
}
