"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { Bell, CreditCard, Earth, Locate, Lock, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

export default function Settings() {
    const { data: session } = useSession()
    const user = typeof sessionStorage !== "undefined" ? sessionStorage.getItem('user')! : null
    const params = [
        {
            img: <User/>,
            title: 'Informations du profile',
            description: 'Change les informations du compte',
            url: '/profile'
        },
        {
            img: <Lock/>,
            title: 'Modification du mot de passe',
            description: 'Change ton mot de passe',
            url: '/password'
        },
        // {
        //     img: <Bell/>,
        //     title: 'Notifications',
        //     description: 'Recevoir les notifications',
        //     url: '/notifications'
        // },
        {
            img: <CreditCard/>,
            title: 'Méthode de payement',
            description: 'Ajoute ton mode de payement',
            url: '/payement'
        },
        {
            img: <Locate/>,
            title: 'Localisation',
            description: 'Modifie ton lieu de livraison',
            url: '/localisation'
        },
        {
            img: <Earth/>,
            title: 'Langue',
            description: 'Modifie la langue',
            url: '/langue'
        },
    ]

    return (
        <>
        <Navbar/>
            <section className="p-5 pt-[100px] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-20 ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Paramètres</p>
                        <div>
                            <LoginFirst route={"/account/settings"} />
                            {user! && (
                                <div className="min-h-[60vh] ">
                                    {params.map((item, idx) => (
                                        <div key={idx}>
                                            <Link href={`/account/settings${item.url}`} className="cursor-pointer text-sm">
                                                <div className="flex justify-start items-center p-1 mt-3 hover:bg-[#dadada] rounded-lg md:w-[500px] ">
                                                    <div className={`text-[${colors.primary}] md:pl-2`}>
                                                        {item.img}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-black font-bold md:text-lg text-sm">{item.title}</p>
                                                        <p className="text-black ">{item.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>

    );
}
