"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { CardData } from "@/utils/card";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import GestionEventCard from "./ManageCard";
import { useEffect, useState } from "react";
import { EventsTypes } from "@/types/interfaces";
import Image from "next/image";
import { clearAllTickets } from "@/utils/services";


export default function Manage() {
    const [allData, setAllData] = useState<EventsTypes[]>()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const { data: session } = useSession()
    useEffect(() => {
        allResult()
        clearAllTickets()
        localStorage.removeItem('file')
    }, [])

    const allResult = async () => {
        const response = await fetch(`/api/events/withStatsByUser?userId=${user.id!}`)
        const data = await response.json()
        setAllData(data.events)
        // console.log(data.events)
    }
    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px]">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-10">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Gérer mes événements</p>
                        <LoginFirst route="/manage" />
                        {user! && (
                            <div>
                                <div className="w-[100%] min-h-[60vh] ">
                                    <div className="grid grid-cols-2 mb-4 pb-3 mt-4 w-[100%] " style={{ borderBottom: '1px solid #000' }}>
                                        <div className="w-[400px]">
                                            <p>Événements</p>
                                        </div>
                                        <div>
                                            <p>Statistiques</p>
                                        </div></div>
                                    <div>
                                        {allData?.length !== 0 && allData?.map((card, idx) => (
                                            <div key={idx} className="grid grid-cols-2 w-[100%] md:w-[800px] gap-2 mt-3 mb-4 pb-4" style={{ borderBottom: '1px solid #dadada' }}>
                                                <div className="ml-[-10px]">
                                                    <GestionEventCard {...card} />
                                                </div>
                                                <div>
                                                    <div className="flex ml-7 md:ml-0 flex-col gap-2 text-sm md:flex-row md:justify-between mt-5">
                                                        <div>
                                                            <div className="md:mb-10 flex md:block gap-3 md:gap-0">
                                                                <p style={{ color: `${colors.primary}` }}>Ticket vendus:</p>
                                                                <p className="md:mt-4 font-bold">{card.ticket_vendus}</p>
                                                            </div>
                                                        </div>
                                                        <div className="md:mb-10 flex md:block gap-3 md:gap-0">
                                                            <p style={{ color: `${colors.primary}` }}>Likes:</p>
                                                            <p className="md:mt-4 font-bold">{card.like}</p>
                                                        </div>
                                                        <div className="md:mb-10 flex md:block gap-3 md:gap-0">
                                                            <p style={{ color: `${colors.primary}` }}>Commentaires:</p>
                                                            <p className="md:mt-4 font-bold">{card.commentNbre}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ml-7 md:ml-0 md:mt-0 mt-2">
                                                        <p className="text-justify hidden md:block text-[12px]"><span className="font-semibold">Description</span> <br />{card.description}</p>
                                                        <p className="text-justify md:hidden block text-[12px]"><span className="font-semibold">Description</span> <br />{card.description.substring(0,50)}...</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-5">
                                                        {card.status === 'valide' && <Image src={'/valide.png'} alt="" height={50} width={170} className="w-[100px] md:w-auto " />}
                                                        {card.status === 'en cours' && <Image src={'/encours.png'} alt="" height={50} width={192} className="w-[100px] md:w-auto " />}
                                                        {card.status === 'refuse' && <Image src={'/refuse.png'} alt="" height={50} width={170} className="w-[100px] md:w-auto " />}
                                                        {card.status === 'cancelled' && <Image src={'/annule.jpeg'} alt="" height={50} width={170} className="w-[100px] md:w-auto " />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {allData?.length === 0 && (
                                            <div className="flex justify-center items-center">
                                                <p className="text-xl font-bold text-center">Aucun événement trouvé.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
