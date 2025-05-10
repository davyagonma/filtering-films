"use client"
import { useState } from "react";

import { Switch } from "@/components/ui/switch"
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function Notifications() {
    const { data: session } = useSession()

    const [switch1, setSwitch1] = useState(true)
    const [switch2, setSwitch2] = useState(true)
    const [switch3, setSwitch3] = useState(true)
    const [disabled, setDisabled] = useState(false)


    return (
        <>
        <Navbar/>
            <section className="p-5 pt-[100px] h-[70vh] md:h-[auto]">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[150px] w-full md:w-[600px]">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Notifications</p>
                        <div>
                            <LoginFirst route={"/account/settings/notifications"} />
                            {session?.user && (
                                <div>
                                    <div className="flex justify-start w-[100%] md:w-[600px] items-center mt-10">
                                        <p className=" w-[100%]">Recevoir les notifications</p>
                                        <div>
                                            <Switch onChange={() => {
                                                setSwitch2(false)
                                                setSwitch3(false)
                                                setDisabled(!disabled)
                                                setSwitch1(!switch1)
                                            }} checked={switch1} aria-label="Automatic updates" />
                                        </div>
                                    </div>
                                    <div className="flex justify-start w-[100%] md:w-[600px] items-center mt-7">
                                        <div className="w-[100%] flex justify-start items-center">
                                            {switch2 && (
                                                <IoMdNotifications size={25} className="mr-1 text-[#C30F66] " />
                                            )}
                                            {!switch2 && (
                                                <IoMdNotificationsOff size={25} className="mr-1 text-[#C30F66] " />
                                            )}
                                            <p >Notifications Push</p>
                                        </div>
                                        <div>
                                            <Switch style={{ pointerEvents: `${disabled ? 'none' : 'visibleFill'}` }}  onChange={() => setSwitch2(!switch2)} checked={switch2} color="danger"  aria-label="Automatic updates" />
                                        </div>
                                    </div>
                                    <div className="flex justify-start w-[100%] md:w-[600px] items-center mt-7">
                                        <div className="w-[100%] flex justify-start items-center">
                                            {switch3 && (
                                                <IoMdNotifications size={25} className="mr-1 text-[#C30F66] " />
                                            )}
                                            {!switch3 && (
                                                <IoMdNotificationsOff size={25} className="mr-1 text-[#C30F66] " />
                                            )}
                                            <p>Notifications SMS</p>
                                        </div>
                                        <div>
                                            <Switch style={{ pointerEvents: `${disabled ? 'none' : 'visibleFill'}` }}  onChange={() => setSwitch3(!switch3)} checked={switch3} color="danger" aria-label="Automatic updates" />
                                        </div>
                                    </div>
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
