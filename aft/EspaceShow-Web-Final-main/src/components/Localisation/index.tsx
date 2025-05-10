"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";


const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function Localisation() {
    const { data: session } = useSession()
    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] min-h-[70vh] md:h-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-10 w-[100%] md:w-[800px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Localisation</p>
                        <div>
                            <LoginFirst route={"/account/settings/localisation"} />
                            {session?.user && (
                                <div>
                                    <p className="text-sm mt-5">Activer votre géolocalisation </p>
                                    <div className="flex flex-col">
                                        <div className="flex justify-center items-center  cursor-pointer mb-7 mt-7">
                                            <Map/>
                                        </div>
                                        {/* <div className="flex justify-center items-center mt-4">
                                            <div className="mt-7 mb-7 cursor-pointer w-[45px] h-[45px] p-[14px] rounded-full bg-[#EF50A1] ">
                                                <svg width="17" height="20" viewBox="0 0 16 20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_5_279" >
                                                        <path d="M7.625 17.59C7.625 17.59 13.25 13.045 13.25 8.12125C13.25 4.98369 10.7315 2.44 7.625 2.44C4.5185 2.44 2 4.98369 2 8.12125C2 13.045 7.625 17.59 7.625 17.59Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                                                        <path d="M7.625 10.3938C7.92047 10.3938 8.21306 10.335 8.48604 10.2208C8.75902 10.1066 9.00706 9.93918 9.21599 9.72816C9.42492 9.51713 9.59066 9.26662 9.70373 8.9909C9.8168 8.71519 9.875 8.41968 9.875 8.12125C9.875 7.82283 9.8168 7.52732 9.70373 7.25161C9.59066 6.97589 9.42492 6.72538 9.21599 6.51435C9.00706 6.30333 8.75902 6.13594 8.48604 6.02174C8.21306 5.90753 7.92047 5.84875 7.625 5.84875C7.02826 5.84875 6.45597 6.08818 6.03401 6.51435C5.61205 6.94053 5.375 7.51855 5.375 8.12125C5.375 8.72396 5.61205 9.30198 6.03401 9.72816C6.45597 10.1543 7.02826 10.3938 7.625 10.3938Z" fill="black" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                                    </mask>
                                                    <g mask="url(#mask0_5_279)">
                                                        <path d="M-1.375 0.924988H16.625V19.105H-1.375V0.924988Z" fill="#fff" fillOpacity="0.88" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div> */}
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
