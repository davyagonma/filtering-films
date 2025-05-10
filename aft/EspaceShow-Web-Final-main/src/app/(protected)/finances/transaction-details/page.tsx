"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import { Hist } from "@/components/Finances";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function FinanceDetails() {
    const { data: session } = useSession()
    const transaction:Hist = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('transHist')!) : null

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] " suppressHydrationWarning>
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[100px] ">
                        <p className="text-xl font-semibold py-2 mb-2"><Link href={'/finances'}>&larr;</Link> </p>
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Détails de l’historique</p>
                        <div style={{ minHeight: '50vh' }}>
                            <LoginFirst route={"/finances"} />
                            {session?.user && (
                                <React.Fragment>
                                    {/* <p>ID: {id}</p> */}
                                    <div suppressHydrationWarning>
                                        <p className="text-center mt-10 font-bold text-xl">{transaction.title}</p>
                                        <p className="text-center text-red-500 mb-5 mt-2 text-xl font-bold">-{transaction.montant} FCFA</p>
                                        <div className="flex justify-start items-center mt-10 text-sm">
                                            <p className="w-[100px] ">TXN ID</p>
                                            <p className="ml-4">{transaction.id}</p>
                                        </div>
                                        <div className="flex justify-start items-center mt-5 text-sm">
                                            <p className="w-[100px] ">Date</p>
                                            <p className="ml-4">{transaction.createdAt.split('T')[0]} - {transaction.createdAt.split('T')[1].split('.')[0]}</p>
                                        </div>
                                        <div className="flex justify-start items-center mt-5 text-sm">
                                            <p className="w-[100px] ">Type</p>
                                            <p className="ml-4">Paiement/Retrait</p>
                                        </div>
                                        <div className="flex justify-start items-center mt-5 text-sm">
                                            <p className="w-[100px] ">Motif</p>
                                            <p className="ml-4">Retrait de fond du compte Espace Show+</p>
                                        </div>
                                        <div className="flex justify-start items-center mt-5 text-sm">
                                            <p className="w-[100px] ">Événement</p>
                                            <p className="ml-4">{transaction.nom}</p>
                                        </div>
                                    </div>

                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
