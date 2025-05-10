"use client"
import Spinner from "@/components/components/Spinner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { EventsTypes } from "@/types/interfaces";
import { colors } from "@/utils/constants";
import { Calendar, DeleteIcon, Locate, MapPin, Trash, WatchIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { UpdateIcon } from "@radix-ui/react-icons";
import Comments from "@/components/components/comments";
import ReactionsComponent from "@/components/components/Reaction";
import ShareComponent from "@/components/components/Reaction/share";

export default function EventDetails() {
    const { toast } = useToast()

    const { data: session } = useSession()

    let userId = ""
    const eventId = useSearchParams()?.get('eventId')
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null

    if (user) {
        userId = user.id
    }

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("En cours de chargement...")

    const modal = typeof localStorage !== 'undefined' ? localStorage.getItem('modal') === "visible" : ''
    const [showModal, setShowModal] = useState(modal || false)

    const [comments, setComments] = useState("")
    const [allComments, setAllComments] = useState<any[]>()

    const [data, setData] = useState<EventsTypes>()
    useEffect(() => {
        getEventById()
        getAllComments()

    }, [])

    const handleAddComment = async (e: Event) => {
        e.preventDefault()
        localStorage.removeItem('modal')
        const response = await fetch(`/api/events/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId, eventId, comments
            })
        })
        const data = await response.json()
        if (!data.success) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue",
                variant: "destructive"
            })
            setComments('')
            return
        } else {
            setShowModal(false)
            toast({
                title: " ",
                description: "Commentaire ajouté",
                variant: "default"
            })
            setComments('')
            window.location.reload()
            return
        }
    }

    const getEventById = async () => {
        const response = await fetch(`/api/events?eventId=${eventId}`)
        if (response.ok) {
            const event = await response.json();
            setData(event.event)
            setIsPending(true)
            // console.log(event)
        } else {
            setError("Une erreur est survenue lors du chargement des informations...")
            setIsPending(false)
        }
    }

    const getAllComments = async () => {
        const response = await fetch(`/api/events/comments?eventId=${eventId}`)
        if (response.ok) {
            const comments = await response.json();
            setAllComments(comments.result)
        } else {
            setError("Une erreur est survenue lors du chargement des commentaires...")
        }
    }

    return (
        <>
            <Navbar />
            {isPending && (
                <section className="col-auto md:flex items-center md:items-start pt-[70px] justify-center px-1 gap-4 py-8 md:py-[100px] ">
                    <div className="md:bg-[#F8F9FA] w-full md:w-[50%]" style={{ padding: '25px', borderRadius: '20px', }}>
                        {isPending && (
                            <div>
                                <div className="w-full" style={{ background:`url(${data?.cover})`, height: '300px', borderRadius: '20px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                {/* <div style={{ background: `url(/im1.webp)`, height: '300px', borderRadius: '20px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', objectFit: 'cover' }}></div> */}

                                <div className="flex justify-start">
                                    <div className="pt-5 mr-10">
                                        <h2 className="text-lg" style={{ color: `${colors.button}` }}>{data?.nom}</h2>
                                        <div className="flex items-center justify-start gap-1">
                                            {/* TODO Remplacer ceci par une icone de coeur */}
                                            {/* <Link className="pr-2 pt-4" href="#">
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.838 16.4275L16.7668 23.5C16.298 23.9687 15.6622 24.232 14.9993 24.232C14.3364 24.232 13.7006 23.9687 13.2318 23.5L6.16053 16.4288C5.57599 15.8493 5.11166 15.1601 4.79419 14.4007C4.47672 13.6414 4.31236 12.8268 4.31056 12.0037C4.30876 11.1806 4.46954 10.3653 4.78368 9.60457C5.09783 8.84382 5.55913 8.1526 6.14113 7.5706C6.72312 6.98861 7.41434 6.5273 8.1751 6.21316C8.93586 5.89902 9.75117 5.73823 10.5742 5.74004C11.3973 5.74184 12.2119 5.90619 12.9713 6.22366C13.7306 6.54113 14.4198 7.00546 14.9993 7.59C16.1762 6.44234 17.758 5.80458 19.4018 5.81488C21.0457 5.82518 22.6193 6.48271 23.7818 7.64503C24.9442 8.80735 25.602 10.3809 25.6125 12.0247C25.6231 13.6686 24.9855 15.2504 23.838 16.4275Z" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <rect width="30" height="30" rx="5" fill="#EF50A1" fillOpacity="0.2" />
                                                </svg>
                                            </Link> */}

                                            <ReactionsComponent userId={user?.id} eventId={data?.id!} />


                                            <p onClick={() => setShowModal(true)} className="pr-2 pt-4 cursor-pointer">
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 9C5 8.20435 5.31607 7.44129 5.87868 6.87868C6.44129 6.31607 7.20435 6 8 6H22C22.7956 6 23.5587 6.31607 24.1213 6.87868C24.6839 7.44129 25 8.20435 25 9V19C25 19.7956 24.6839 20.5587 24.1213 21.1213C23.5587 21.6839 22.7956 22 22 22H17.828C17.5628 22.0001 17.3085 22.1054 17.121 22.293L15.254 24.16C14.054 25.361 12 24.51 12 22.812C12 22.5966 11.9145 22.3901 11.7622 22.2378C11.6099 22.0856 11.4034 22 11.188 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V9ZM10 9C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10C21 9.73478 20.8946 9.48043 20.7071 9.29289C20.5196 9.10536 20.2652 9 20 9H10ZM10 13C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15H20C20.2652 15 20.5196 14.8946 20.7071 14.7071C20.8946 14.5196 21 14.2652 21 14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H10ZM10 17C9.73478 17 9.48043 17.1054 9.29289 17.2929C9.10536 17.4804 9 17.7348 9 18C9 18.2652 9.10536 18.5196 9.29289 18.7071C9.48043 18.8946 9.73478 19 10 19H14C14.2652 19 14.5196 18.8946 14.7071 18.7071C14.8946 18.5196 15 18.2652 15 18C15 17.7348 14.8946 17.4804 14.7071 17.2929C14.5196 17.1054 14.2652 17 14 17H10Z" fill="#C30F66" fillOpacity="0.88" />
                                                    <rect width="30" height="30" rx="5" fill="#EF50A1" fillOpacity="0.2" />
                                                </svg>
                                            </p>
                                            {/* @ts-ignore */}
                                            <ShareComponent {...data} />


                                            {/* <Link className="pt-4" href="#">
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V25C30 27.7614 27.7614 30 25 30H5C2.23858 30 0 27.7614 0 25V5Z" fill="#EF50A1" fillOpacity="0.2" />
                                                    <path d="M9 15V21C9 21.3978 9.15804 21.7794 9.43934 22.0607C9.72064 22.342 10.1022 22.5 10.5 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V15" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M18 10.5L15 7.5L12 10.5" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15 7.5V17.25" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link> */}
                                        </div>
                                    </div>

                                    <div style={{ width: "3px", backgroundColor: "#000" }} className="mt-6 mr-3 -ml-10 md:-ml-0 md:mr-6 h-[100px] md:h-[85px] "></div>

                                    <div className="md:flex flex-col md:flex-row md:justify-between items-center ">
                                        <div className="mt-5">
                                            <div className="flex justify-start items-center">
                                                <Calendar size={15} />
                                                <span className="text-[11px] md:text-[13px] " style={{ paddingLeft: '5px' }}>{data?.date_debut}</span>
                                            </div>

                                            <div className="flex justify-start items-center mt-3">
                                                <MapPin className="md:size-5" size={15} />
                                                <span className="p-2 text-sm">{data?.adresse}</span>
                                            </div>

                                        </div>

                                        <div className="flex justify-start items-center mt-3 md:mt-0 md:ml-3">
                                            <WatchIcon className="-rotate-45" size={20} />
                                            <span style={{ fontSize: '13px', paddingLeft: '5px' }}>{data?.heure}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="pt-7 pb-10 block md:flex items-center justify-between">
                                    <Link className="text-white flex justify-start w-max items-center" href={`/ticket?eventId=${data?.id}`} style={{ backgroundColor: `${colors.button}`, padding: '6px', borderRadius: '5px', paddingLeft: '20px', paddingRight: '20px' }}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.27566 3.39281L6.95452 4.04067C7.06085 4.14214 7.20881 4.19557 7.36587 4.18919C7.52292 4.18281 7.67619 4.11716 7.79197 4.00666C7.90775 3.89617 7.97654 3.7499 7.98323 3.60002C7.98991 3.45014 7.93393 3.30894 7.8276 3.20747L7.14874 2.5596L8.45836 1.30979C8.63034 1.14567 8.83175 1.01283 9.05108 0.918881C9.27041 0.824929 9.50338 0.771696 9.73667 0.762222C9.96996 0.752749 10.199 0.787218 10.4107 0.863666C10.6225 0.940112 10.8128 1.05704 10.9707 1.20777L12.3755 2.54838C12.4583 2.6275 12.5112 2.73138 12.5268 2.84571C12.5423 2.96003 12.5198 3.07919 12.4624 3.18678C12.3469 3.40211 12.3016 3.64075 12.3325 3.86977C12.3635 4.09878 12.4693 4.30687 12.6354 4.46532C12.8014 4.62376 13.0195 4.72474 13.2594 4.75432C13.4994 4.78389 13.7495 4.74061 13.9751 4.63044C14.2064 4.51787 14.4746 4.55165 14.644 4.71336L16.0488 6.05397C16.2068 6.2047 16.3293 6.38628 16.4094 6.58835C16.4895 6.79041 16.5256 7.00901 16.5157 7.23164C16.5058 7.45428 16.45 7.6766 16.3515 7.88592C16.2531 8.09524 16.1139 8.28744 15.9419 8.45157L14.6323 9.70138L13.9534 9.05352C13.8471 8.95205 13.6991 8.89863 13.5421 8.90501C13.385 8.91138 13.2318 8.97704 13.116 9.08753C13.0002 9.19802 12.9314 9.34429 12.9247 9.49417C12.918 9.64405 12.974 9.78526 13.0803 9.88673L13.7592 10.5346L8.08418 15.9504C7.73685 16.2819 7.27703 16.4789 6.80587 16.498C6.33472 16.5171 5.89083 16.3569 5.57185 16.0525L4.16708 14.7118C3.9971 14.5496 3.96223 14.2942 4.08019 14.0735C4.19563 13.8581 4.24099 13.6195 4.21 13.3905C4.179 13.1614 4.07319 12.9534 3.90717 12.7949C3.74114 12.6365 3.52309 12.5355 3.28312 12.5059C3.04314 12.4763 2.79308 12.5196 2.56744 12.6298C2.45471 12.6846 2.32985 12.7061 2.21005 12.6913C2.09025 12.6764 1.9814 12.626 1.8985 12.5469L0.493728 11.2063C0.174749 10.9018 0.0068118 10.4782 0.0268609 10.0286C0.0469101 9.57895 0.253303 9.14013 0.600636 8.80866L6.27566 3.39281ZM9.49857 4.80212C9.39225 4.70065 9.24428 4.64723 9.08723 4.65361C8.93018 4.65999 8.77691 4.72564 8.66113 4.83613C8.54535 4.94662 8.47655 5.09289 8.46987 5.24277C8.46319 5.39265 8.51917 5.53386 8.62549 5.63533L9.18248 6.16688C9.28881 6.26835 9.43677 6.32178 9.59382 6.3154C9.75088 6.30902 9.90415 6.24336 10.0199 6.13287C10.1357 6.02238 10.2045 5.87611 10.2112 5.72623C10.2179 5.57635 10.1619 5.43515 10.0556 5.33368L9.49857 4.80212ZM11.726 6.92782C11.6197 6.82635 11.4717 6.77293 11.3147 6.77931C11.1576 6.78569 11.0043 6.85134 10.8886 6.96183C10.7728 7.07232 10.704 7.21859 10.6973 7.36847C10.6906 7.51835 10.7466 7.65956 10.8529 7.76103L11.4094 8.29207C11.5157 8.39354 11.6637 8.44696 11.8207 8.44059C11.9778 8.43421 12.131 8.36855 12.2468 8.25806C12.3626 8.14757 12.4314 8.0013 12.4381 7.85142C12.4448 7.70154 12.3888 7.56033 12.2825 7.45886L11.726 6.92782ZM6.34396 11.2346C6.23763 11.1331 6.18166 10.9919 6.18834 10.842C6.19502 10.6922 6.26382 10.5459 6.3796 10.4354L8.41678 8.49125C8.53256 8.38076 8.68584 8.3151 8.84289 8.30872C8.99994 8.30235 9.1479 8.35577 9.25423 8.45724C9.36055 8.55871 9.41653 8.69992 9.40985 8.8498C9.40317 8.99967 9.33437 9.14595 9.21859 9.25644L7.18141 11.2006C7.06563 11.3111 6.91235 11.3767 6.7553 11.3831C6.59825 11.3895 6.45029 11.3361 6.34396 11.2346ZM7.68031 12.5099C7.57398 12.4084 7.518 12.2672 7.52469 12.1174C7.53137 11.9675 7.60017 11.8212 7.71594 11.7107L8.58902 10.8775C8.7048 10.767 8.85808 10.7014 9.01513 10.695C9.17218 10.6886 9.32014 10.742 9.42647 10.8435C9.5328 10.945 9.58877 11.0862 9.58209 11.2361C9.57541 11.3859 9.50661 11.5322 9.39083 11.6427L8.51775 12.4759C8.40197 12.5864 8.2487 12.6521 8.09165 12.6584C7.9346 12.6648 7.78663 12.6114 7.68031 12.5099Z" />
                                        </svg>
                                        <span className="pl-1 py-2 text-sm  md:py-0 md:pl-2 md:w-[auto] md:text-lg" style={{ fontSize: '14px' }}>Réserver un ticket</span>
                                    </Link>
                                    {/* <p className="pt-4 md:pt-0 text-sm text-justify md:text-lg">(Tickets VIP: 15000 - Tickets Simples: 5000-etc)</p> */}
                                    <div className="pt-4 md:pt-0 text-sm text-justify  justify-start gap-2">
                                        {data?.tickets!.map((tic, id) =>
                                            <p key={id}>Ticket <span className="font-semibold">{tic.type_de_ticket}</span> : {tic.prix_ticket} FCFA</p>
                                        )}
                                    </div>
                                </div>

                                <h2 className="pb-3 font-bold ">Description</h2>
                                <p style={{ color: '#495057', fontSize: '14px', opacity: '.8' }} className="text-justify">{data?.description}</p>
                                <h2 className="pt-5 pb-3 font-bold">Catégorie et lieu</h2>
                                <p style={{ color: '#495057', fontSize: '14px', opacity: '.8' }}>{data?.categorie}, {data?.adresse}</p>
                            </div>
                        )}
                    </div>

                    {allComments && allComments?.length! > 0 && (
                        <div className="md:w-[40%] m-[25px] md:m-0 px-1 p-[25px] md:p-0 md:max-h-screen md:overflow-y-scroll">
                            <p className="font-bold text-lg">Commentaires de l'événement</p>
                            <div>
                                {allComments.map((comment, index) => (
                                    <div key={index}>
                                        <Comments {...comment} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Dialog open={showModal} onOpenChange={() => {
                        setShowModal(false)
                        localStorage.removeItem('modal')
                    }} >
                        {session?.user && user && (
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Ajouter un commentaire</DialogTitle>
                                    <DialogDescription>
                                        Dites ce que vous pensez de cet événement
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="w-full items-center">
                                    <textarea id="comments" placeholder="Votre commentaire ici ..." value={comments} onChange={(e) => setComments(e.target.value)} autoFocus rows={5} className="p-2 w-[90%] outline-none col-span-3 ml-5 resize-none border border-slate-200 text-black"></textarea>
                                </div>
                                <DialogFooter>
                                    <Button onClick={(e) => handleAddComment(e as any)} className={`bg-[${colors.primary}] hover:bg-[${colors.primary}]`} type="submit">Commenter</Button>
                                </DialogFooter>
                            </DialogContent>
                        )}
                        {!user && (
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Vous n'êtes pas connecté</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    Pour commenter cet événement, vous devez vous connecter
                                </DialogDescription>
                                <DialogFooter>
                                    <Link href={'/sign-in'} className={`bg-[${colors.primary}] hover:bg-[${colors.primary}] p-2 text-white rounded-lg`} type="submit">Se connecter</Link>
                                </DialogFooter>
                            </DialogContent>
                        )}
                    </Dialog>
                </section>
            )}
            {!isPending && <section className="min-h-[90vh] flex justify-center items-center text-center">
                <div>
                    <Spinner />
                    <p>{error}</p>
                </div>
            </section>}
            <Footer />
        </>
    );
}
