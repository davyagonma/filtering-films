"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Payement() {
    const { data: session } = useSession()
    useEffect(() => {
        localStorage.removeItem('route')
    }, [])



    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] h-[70vh] md:h-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[150px] w-[100%] md:w-[500px]  ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Méthode de paiement</p>
                        <div>
                            <LoginFirst route={"/account/settings/payement"} />
                            {session?.user && (
                                <div>
                                    <select className="w-full p-2 rounded-lg mt-10" style={{ border: '2px solid #C30F66', outline: 'none' }}>
                                        <option value="MTN">KKIAPAY</option>
                                    </select>
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
