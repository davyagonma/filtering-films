"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

export default function Scan() {
    const { toast } = useToast()
    const [eventId, setEventId] = useState('')

    useEffect(() => {
        toast({
            title: "Message",
            description: "Veuillez remplir ces champs avec les informations qui vous ont été transmises par email",
            variant: "default"
        })
    }, [])

    const handleScan = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!eventId) {
            toast({
                title: "Erreur",
                description: "Id de l'événement réquis",
                variant: "destructive"
            })
            return
        }
        const res = await fetch(`/api/events?eventId=${eventId}`)
        const data = await res.json()

        if (!data.success) {
            toast({
                title: "Erreur",
                description: "Assurez-vous d'avoir renseigné les bonnes informations",
                variant: "destructive"
            })
            return
        }
        if (data.success) {
            window.location.href = `/scan/qrcode?uuid=${eventId}&process=${data.event.code}`
            // return
        }
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] h-[70vh] md:h-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="text-center m-[auto]">
                        <div className="flex justify-center w-full mt-10 md:md-0 ">
                            <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Scanner un code QR</p>
                        </div>
                        <div>
                            <LoginFirst route={"/scan"} />
                            <div className="text-center mt-6 min-h-[40vh] ">
                                <form onSubmit={(e) => handleScan(e as React.FormEvent<HTMLFormElement>)}>
                                    <div>
                                        <input type="text" placeholder="Clé" value={eventId} onChange={(e) => setEventId(e.target.value)} className="p-7 rounded-lg border text-center border-gray-300 text-lg focus:outline-none focus:border-gray-600" />
                                    </div>
                                    {/* <div className="mt-2">
                                            <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} className="p-7 rounded-lg border text-center border-gray-300 text-lg focus:outline-none focus:border-gray-600" />
                                        </div> */}
                                    <div>
                                        <button type="submit" className="bg-[#C30F66] p-2 w-[120px] cursor-pointer text-white rounded-lg mt-10">Valider</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}

