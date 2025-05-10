import { Reservation } from "@/types/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye } from "lucide-react"

const UserHistory = () => {
    const [history, setHistory] = useState<Reservation[]>()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    // a loding state only
    const [process, setProcess] = useState(true)

    useEffect(() => {
        // fetch data from api
        fetch(`/api/commandeHistory?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                setHistory(data.userHistory)
                // console.log(data)
                setProcess(false)
            })
            .catch(error => console.error(error))
    }, [])


    if (!history || history?.length == 0) return (
        <div className="flex items-center min-h-[50vh] justify-center gap-4 py-8 md:py-10">
            <div className="md:bg-[#F8F9FA] w-full" style={{ padding: '25px', borderRadius: '20px', }}>
                <div>
                    <div className="flex justify-center items-center">
                        <div className="pt-5 text-center">
                            <h2 style={{ color: '#C30F66', fontSize: '20px' }}>Aucun historique disponible pour le moment</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div className="md:w-[750px] w-[95%] min-h-[70vh]">
            {history.map((item: Reservation, idx) => (
                <div key={idx}>
                    <History {...item} />
                </div>
            ))}
        </div>
    )
}

export default UserHistory


const History = (data: Reservation) => {
    const [open, setOpen] = useState(false)
    return (
        <>

            <div onClick={() => setOpen(true)} className="mt-3 pb-3 cursor-pointer hover:opacity-70 text-sm" style={{ borderBottom: '1px solid #6C757D' }}>
                <div className="flex justify-between items-center">
                    <Image loading="lazy" quality={60} alt="" height={0} width={100} className="w-[50px] h-[50px] rounded-full " style={{ border: "2px solid #C30F66" }} src={data.avatar} />
                    <p className="text-[#C30F66] ">{data.createdAt.split('T')[0]} - {data.heure}</p>
                </div>
                <div className="pt-2">
                    <p className="text-sm">{data.message}</p>
                    <p className="text-sm font-semibold">Réservation N°: R0-{data.reference}</p>
                </div>
            </div>

            <Dialog onOpenChange={() => setOpen(false)} open={open}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <p className="text-sm ">N°: R0-{data.reference}</p>
                        </DialogTitle>
                        <DialogDescription>
                            <div className="flex justify-start items-start gap-3">
                                <Image loading="lazy" quality={60} alt="" height={0} width={100} className="w-[150px] h-[100px] rounded-lg " src={data.avatar} />
                                <div>
                                    <p className="text-sm">Date: {data.createdAt.split('T')[0]}</p>
                                    <p className="text-sm">Heure: {data.heure}</p>
                                    <Link onClick={() => setOpen(false)} target="blank" className="flex justify-center p-1 rounded-lg mt-6 gap-1 text-white bg-[#C30F66] items-center" href={data.link}> <span>Voir</span> <Eye/></Link>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { History }