"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import AdminHistory from "@/components/components/AminHistory";
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
// import UserHistory from "@/components/components/UserHistory";
import { colors } from "@/utils/constants";
import { checkIfUserIsAdmin } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import dynamic from 'next/dynamic'

const AdminHistory = dynamic(() => import('@/components/components/AminHistory'), { ssr: false })
const UserHistory = dynamic(() => import('@/components/components/UserHistory'), { ssr: false })


export default function Historique() {

    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null;

    useEffect(() => {
        localStorage.removeItem('route')
    }, [])

    const isAdmin = checkIfUserIsAdmin()
    const { data: session } = useSession()

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] w-[100%]">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-10 ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Historique des commandes</p>
                        <div>
                            <LoginFirst route={"/history"} />
                            {user! && (
                                <div>
                                    {isAdmin && (
                                        <AdminHistory />
                                    )}
                                    {!isAdmin && (
                                        <UserHistory />
                                    )}
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
