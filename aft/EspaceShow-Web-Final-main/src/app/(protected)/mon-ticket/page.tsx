"use client"
import { ChevronRight, Download, MapPin, Watch } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toJpeg } from 'html-to-image';
import { colors } from '@/utils/constants'

const CreateTicket = () => {
    const userId = useSearchParams()!.get('userId')
    const eventId = useSearchParams()!.get('eventId')
    const reservationId = useSearchParams()!.get('reservationId')
    const [error, setError] = useState("")
    const [data, setData] = useState<any>()

    useEffect(() => {
        fetch(`/api/mon-ticket?userId=${userId}&eventId=${eventId}&reservationId=${reservationId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data)
                setError(data.message)
            })
            .catch(error => setError(error.message))
    }, [userId, eventId, reservationId])

    if (error) {
        return <div className='flex text-center m-3 justify-center items-center h-screen'>{error}</div>
    }

    if (!data) {
        return <div className='flex text-center m-3 justify-center items-center h-screen'>Veuillez patienter pendant un moment</div>
    }

    const handleDownload = async (e: Event) => {
        e.preventDefault()
        await toJpeg(document.getElementById('ticket')!, { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `billet_${reservationId}.jpeg`;
                link.href = dataUrl;
                link.click();
            })
    }

    return (
        <section className='flex bg-slate-50 p-2 justify-center items-center'>
            <div className='mb-10 ml-[140px] md:ml-0'>
                <div className='flex justify-center items-center text-center p-2'>
                    <button onClick={(e) => handleDownload(e as any)} className='flex justify-center items-center gap-2 border border-slate-300 rounded-sm p-2'>
                        <span>Télécharger mon ticket</span>
                        <span> <Download size={16} /> </span>
                    </button>
                </div>
                <div id='ticket' className='bg-white'>
                    <div className='h-[300px] w-[500px]' style={{ background: `url(${data.event.cover})`, objectFit: 'cover', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                    <div className='relative w-[500px] text-sm flex justify-between items-start gap-3'>
                        <div className='w-1/3 p-3'>
                            <p style={{ color: `${colors.primary}` }} className='font-bold'>{data.event.nom}</p>
                        </div>
                        <div className='w-1/3 p-3'>
                            <p>Participant</p>
                            <p className='font-bold'>{data.reservation.prenom} {data.reservation.nom}</p>
                        </div>
                        <div className='w-1/3 p-3 uppercase text-[10px] flex justify-center items-center font-bold'>
                            <div className='w-1/3'>
                                <p>{data.debut.date}</p>
                                <p>{data.debut.annee}</p>
                            </div>
                            <div>
                                <ChevronRight size={30} />
                            </div>
                            <div className='w-1/3'>
                                <p>{data.fin.date}</p>
                                <p>{data.debut.annee}</p>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm -mt-5 flex justify-between items-center gap-3'>
                        <div className='w-1/2 p-1 m-3 border flex justify-between items-center border-gray-400'>
                            <p style={{ lineHeight: '7px' }} className='text-[7px]'>N'imprimez pas deux <br />fois le même billet</p>
                            <p className='text-[12px]'>N° 00{data.numero}</p>
                        </div>
                        <div className='w-1/2 p-3 text-sm flex justify-end items-center'>
                            <div className='w-full flex-col'>
                                <p className=' w-full text-lg font-bold flex items-center gap-2'>
                                    <span>
                                        <Watch size={15} />
                                    </span>
                                    <span>
                                        {data.event.heure}
                                    </span>
                                </p>
                                <p className='text-[12px] w-full flex items-center gap-2'>
                                    <span>
                                        <MapPin size={15} />
                                    </span>
                                    <span>
                                        {data.event.adresse}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm -mt-5 flex justify-between items-center gap-3'>
                        <div className='w-1/2 p-1 m-3'>
                            <p className='text-[12px]'>Organisé par:</p>
                            <p className='text-[12px] font-semibold'>{data.organisateur}</p>
                        </div>
                        {/* <div className='w-1/2 p-3 text-[8px] md:text-sm flex justify-end items-center'>
                            <div className='text-left'>
                                <p className=''>Date de la commande</p>
                                <p className='text-[12px] font-semibold'>{data.date_commande} </p>
                            </div>
                        </div> */}
                    </div>

                    <div>
                        <div className="text-sm text-center uppercase">
                            Type de ticket: <span style={{ color: `${colors.primary}` }}>{data.reservation.type_ticket}</span>
                        </div>
                        <div className="font-bold text-lg text-center">
                            {data.prix_ticket}  FCFA
                        </div>
                    </div>

                    <div className='flex justify-center -mt-1 items-center'>
                        <Image height={100} width={150} alt='qrcode' src={`${data.url}`} />
                    </div>
                    <div className='relative bottom-[60px] ml-[400px] right-5'>
                        <p className='text-[7px] uppercase font-semibold'>Powered by</p>
                        <Image loading='lazy' quality={70} src={"/logo.png"} alt='logo' width={80} height={50} />
                    </div>
                    <div className='text-sm p-2'>
                        <p>Date d'achat: {data.date_commande} </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default CreateTicket


// http://localhost:3000/mon-ticket?userId=cm0xrce1f0001qrrpcbwctrpp&eventId=cm0xtgya60003rdtiv5xtsg10&reservationId=cm0y1e9t3000110oyupq0gjr9