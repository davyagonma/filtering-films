"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DataTableDemo, NotificationsTypes } from "./data-table"
import React from "react";

export default function Notify() {
    const { data: session } = useSession()
    const [allNotifications, setAllNotifications] = React.useState<NotificationsTypes[]>([])
    const user = typeof sessionStorage !== "undefined" ? JSON.stringify(sessionStorage.getItem('user')) : null

    React.useEffect(() => {
        getNotification()
    }, [])

    const getNotification = async () => {
        const response = await fetch(`/api/notifications`)
        const data = await response.json()
        setAllNotifications(data.notifications)
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] " style={{ minHeight: '90vh' }}>
                <p className=" hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[100px] w-[100%] md:w-[800px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Notifications</p>
                        <div>
                            <LoginFirst route={"/notification"} />
                            {user! && (
                                <DataTableDemo />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
