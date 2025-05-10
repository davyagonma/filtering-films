import { EventsTypes } from "@/types/interfaces";
import { colors } from "@/utils/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image";
import { DotsVerticalIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Calendar, Cross, Locate, MapPin, Timer, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { revalidatePath } from "next/cache";


const GestionEventCard = (item: EventsTypes) => {
    const {toast} = useToast()

    const handleDeleteEvent = async (id:string) => {
        const response = await fetch(`/api/events?eventId=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const data = await response.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive",
            })
            return
        }
        toast({
            title: "Succès",
            description: "L'événement a été supprimé avec succès",
            variant: "default",
        })
        window.location.reload()
    }

    const handleAnnuleEvent = async (id: string) => {
        const response = await fetch(`/api/events/fallback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({eventId:id})
        })
        if (!response.ok) {
            const data = await response.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive",
            })
            return
        }
        toast({
            title: "Succès",
            description: "L'événement a été annulé avec succès",
            variant: "default",
        })
        window.location.reload()
    }
    return (
        <div className="md:w-[300px] w-[180px] " style={{ overflow: 'hidden', backgroundColor: `${colors.card}`, margin: '10px', borderRadius: '20px' }} >
            <div className="md:h-[210px] h-[100px] " style={{ overflow: 'hidden' }}>
                <Link href={`/event/details?eventId=${item.id}`}>
                    <Image alt="cover" width={100} height={0} className="md:h-[180px] cursor-pointer h-[100px] w-[100%]" src={item.cover} style={{ borderRadius: '0px' }} />
                </Link>
            </div>
            <div className="md:mt-[-35px] " style={{ padding: '10px' }}>
                <p className="text-sm" style={{ color: `${colors.button}`, fontWeight: 'bold' }}>{item.nom}</p>

                <div className="flex justify-between items-center ">
                    <div className="md:mt-5">
                        <div className="flex justify-start items-center">
                            <Calendar size={20} color="#C30F66" />
                            <span className="text-xxl md:text-xl" style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.date_debut}</span>
                        </div>
                        <div className="flex  mt-1 md:mt-3">
                            <MapPin size={20} color="#C30F66" />
                            <span className="text-[11px] md:text-xl" style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.adresse}</span>
                        </div>
                    </div>

                    <div className="hidden md:flex justify-start items-center">
                        <Timer size={20} color="#C30F66" />
                        <span style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.heure}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p></p>
                    </div>
                    <div className="pt-2">
                        <Popover>
                            <PopoverTrigger>
                                <div className="w-5 h-5 flex justify-center items-center bg-slate-500 text-white rounded-full p-1">
                                    <DotsVerticalIcon  fontSize={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-36">
                                {item.status !== 'cancelled' ? <div className="text-sm">
                                    {item.status !== 'refuse' && item.status !== 'cancelled' && <Link href={`/event/update?eventId=${item.id}`} onClick={() => sessionStorage.setItem('ev', JSON.stringify(item))} className="flex w-full justify-start rounded-sm items-center gap-2 my-1 p-1 hover:bg-slate-200 ">
                                        <UpdateIcon fontSize={16} color="#C30F66" />
                                        <span className="text-sm">Modifier</span>
                                    </Link>}
                                    {item.ticket_vendus === 0 ? <button onClick={() => handleDeleteEvent(item.id)} className="flex w-full justify-start rounded-sm items-center gap-2 my-1  p-1 hover:bg-slate-200">
                                        <Trash size={15} color="#C30F66" />
                                        <span className="text-[#C30F66]">Supprimer</span>
                                    </button> : <button onClick={() => handleAnnuleEvent(item.id)} className="flex w-full justify-start rounded-sm items-center gap-2 my-1  p-1 hover:bg-slate-200">
                                        <p className="text-[#C30F66] pl-0 text-[22px]">&times;</p>
                                        <span className="text-[#C30F66]">Annuler</span>
                                    </button>}
                                </div> : <div className="text-sm">
                                        <button onClick={() => handleDeleteEvent(item.id)} className="flex w-full justify-start rounded-sm items-center gap-2 my-1  p-1 hover:bg-slate-200">
                                            <Trash size={15} color="#C30F66" />
                                            <span className="text-[#C30F66]">Supprimer</span>
                                        </button>
                                </div> }
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GestionEventCard
