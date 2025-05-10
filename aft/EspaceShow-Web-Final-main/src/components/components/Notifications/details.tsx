"use client"
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import LoginFirst from "../LoginFirst";
import Menu from "../Menu";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NotificationsTypes } from "./data-table";
import { useToast } from "@/hooks/use-toast";


export default function NotifyDetail() {
    const { data: session } = useSession()
    const {toast} = useToast()
    const notificationId  = useSearchParams()?.get('id')
    const notification:NotificationsTypes = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('notifItemClicked')!) : null
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const router = useRouter()

    const handleDelete = async (e: Event) => {
        e.preventDefault()
        const res = await fetch(`/api/notifications?notificationId=${notificationId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user?.id!
            })
        })
        if (!res.ok) {
            const data = await res.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive"
            })
        }
        toast({
            title: "Notification supprimée",
            description: "La notification a été supprimée avec succès",
            variant: "default"
        })
        window.location.reload()
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] " style={{ minHeight: '70vh' }}>
                <p className="text-xl hidden md:block font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[100px] w-[100%] md:w-[800px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Notifications</p>
                        <div>
                            <LoginFirst route={"/notification"} />
                            {session?.user && (
                                <div className="mt-5 text-sm">
                                    <div className="flex justify-start items-center">
                                        <div className="mr-7" >
                                            <p onClick={() => router.back()} className="text-[22px] cursor-pointer text-[rgba(0,0,0,.54)] ">&larr;</p>
                                        </div>
                                        <div onClick={(e) => handleDelete(e as any)}>
                                            <AiFillDelete size={25} color="rgba(0,0,0,.54)" cursor={'pointer'} />
                                        </div>
                                    </div>

                                    <div className=" bg-[#ebeced] p-4 rounded-lg  mt-10 ">
                                        <div className="flex justify-start items-center mb-6">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="black" fillOpacity="0.05" />
                                                <path d="M20.0013 19.9998C22.0271 19.9998 23.668 18.359 23.668 16.3332C23.668 14.3073 22.0271 12.6665 20.0013 12.6665C17.9755 12.6665 16.3346 14.3073 16.3346 16.3332C16.3346 18.359 17.9755 19.9998 20.0013 19.9998ZM20.0013 21.8332C17.5538 21.8332 12.668 23.0615 12.668 25.4998V27.3332H27.3346V25.4998C27.3346 23.0615 22.4488 21.8332 20.0013 21.8332Z" fill="black" fillOpacity="0.16" />
                                            </svg>
                                            <p className="text-sm ml-4">{notification?.title!} </p>
                                        </div>
                                        <div>
                                            <p className="text-justify text-sm">{notification?.message!} </p>
                                        </div>
                                    </div>
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
