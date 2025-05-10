"use client"

import React,{ useEffect, useState } from "react"
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import Image from "next/image";

const AdminHistory = () => {
    const [isOpen, setIsOpen] = useState(false)
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null

    const [history, setHistory] = useState<any[]>()
    const [participants, setParticipants] = useState<any[]>()
    const [type, setType] = useState("")

    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async () => {
        const res = await fetch(`/api/commandeHistory/organisateur?email=${user?.email!}`)
        const result = await res.json()
        if (!res.ok) {
            console.error('Error:', result.error)
            return
        }
        // console.log(result.history)
        setHistory(result.history)
    }


    const seeModal = (id: number) => {
        // console.log(id)
        setIsOpen(true)
    }


    return (
        <div className=" justify-start min-h-[60vh] items-center mx-[auto] mt-10 ">
            {history && history.length > 0 ? <div>
                <table>
                    <thead>
                        <tr className=" mb-4 text-[#C30F66] opacity-80 font-normal">
                            <th className="text-left pb-2 md:w-[200px] md:text-sm text-[11px] ">Événement</th>
                            <th className="text-center pb-2 md:w-[200px] md:text-sm text-[11px] ">Ticket</th>
                            <th className="text-center pb-2 md:w-[200px] md:text-sm text-[11px] ">Commandes</th>
                            <th className="text-center pb-2 md:w-[200px] md:text-sm text-[11px] ">Total</th>
                            <th className="text-center pb-2 md:w-[200px] md:text-sm text-[11px] ">Participants</th>
                        </tr>
                    </thead>
                    <tbody className="md:text-sm text-[12px]" suppressHydrationWarning>
                        {history.map((item, idx) => (
                            <React.Fragment key={idx}>
                                {item.tickets.length > 0 && item.tickets.map((ticket: any, id: number) => (
                                    <tr key={`${idx}-${id}`} className="border-t-2">
                                        <td className="py-3 ">{item.nom}</td>
                                        <td className="py-3 uppercase text-center">{ticket.type}</td>
                                        <td className="py-3 text-center">{ticket.nombre}</td>
                                        <td className="py-3 text-center">{ticket.montant} FCFA</td>
                                        <td className="py-3 text-center">
                                            <p className="cursor-pointer font-semibold" onClick={() => {
                                                setIsOpen(true)
                                                setParticipants(ticket.participants)
                                                setType(ticket.type)
                                            }}>{ticket.montant !== 0 ? 'Voir liste':''}</p>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div> :
                <p className="text-center my-3 border p-3 rounded-lg flex justify-center items-center text-sm">Aucune données disponibles pour votre historique</p>
            }


            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent className="sm:max-w-[450px] ">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex text-[11px] justify-between items-center my-3">
                                <p>Participants</p>
                                {participants && participants.length >= 6 && <p className="text-sm">
                                    <Link className="text-[#C30F66] " href={''}>Voir plus &rarr;</Link>
                                </p>}
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Liste des participants ayant acheté ce ticket
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-wrap">
                        {participants?.slice(0, 5).map((participant: Data, idx: number) => (
                            <div key={idx}>
                                <Line data={participant} type={type} />
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>



        </div>
    )
}

export default AdminHistory

export interface Data {
    profile: string,
    nom: string,
    prenom: string,
    id: string,
    createdAt: string
}
const Line = (data: { data: Data, type?: string }) => {
    return (
        <>
            <div className="flex justify-between md:w-[390px] text-[11px]  gap-2 items-center p-1 pb-2 w-[calc(85vw)] " style={{ borderBottom: '1px solid #BAC3CB' }}>
                <div className="flex justify-start items-center">
                    <Image alt="" width={100} height={0} className="rounded-full border-2 w-[35px] h-[35px]" src={data.data.profile} />
                    <p className="pl-3 ">{data.data.prenom} {data.data.nom}</p>
                </div>
                <div>
                    {data.type && <p className=" text-[#C30F66]">Ticket{" "}{data.type}</p>}
                </div>
                <div>
                    <p className="">{data.data.createdAt.split('T')[1].split('.')[0]}</p>
                </div>
            </div>
        </>
    )
}

export { Line }