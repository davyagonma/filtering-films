"use client"
import Menu from "../components/Menu";
import LoginFirst from "../components/LoginFirst";
import { colors } from "@/utils/constants";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect, useState } from "react";

export interface RetraitDispo {
    eventId: string;
    nom: string;
    retrait: Retrait
}

export interface Retrait {

    "retraitId": string,
    "soldeBrut": number,
    "commission": number,
    "createdAt": string,
    "updatedAt": string
}

export interface Hist {
    "id": string,
    "userId": string,
    "title": string,
    "montant": string,
    "nom": string,
    "statut": string,
    "createdAt": string,
    "updatedAt": string
}

export default function Finances() {
    const { data: session } = useSession()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null;
    const [loading, setLoading] = useState(true);
    const [retraitDispo, setRetraitDispo] = useState<RetraitDispo[]>();
    const [currentRetrait, setCurrentRetrait] = useState<RetraitDispo>();
    const [current, setCurrent] = useState<string>("");
    const [id, setId] = useState<string>("");

    const [historique, setHistorique] = useState<Hist[]>()

    useEffect(() => {
        const fetchRetraitDispo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/getRetraitAvailable?userId=${user?.id!}`);
                const data = await response.json();
                if (data.success) {
                    setRetraitDispo(data.retraitDispo);
                    if (data.retraitDispo.length > 0) {
                        setCurrentRetrait(data.retraitDispo[0]);
                        setCurrent(data.retraitDispo[0].nom);
                        setId(data.retraitDispo[0].eventId);
                    }
                }
            } catch (error) {
                console.error("Error fetching available retraits:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchHistorique = async () => {
            try {
                const response = await fetch(`/api/transactions/historique?userId=${user?.id!}`);
                const data = await response.json();
                if (data.success) {
                    setHistorique(data.transactionsHistory);
                    // console.log(data.transactionsHistory)
                }
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            }
        };

        fetchHistorique();
        fetchRetraitDispo();
    }, [user?.id]);

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-[100px] w-[100%] md:w-[800px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Mes finances</p>
                        <div className="">
                            <LoginFirst route={"/finances"} />
                            {session?.user && retraitDispo?.length! > 0 && (
                                <div>
                                    {!loading && retraitDispo && currentRetrait && <div>
                                        <select className="border rounded-sm p-2 my-5 w-[100%] md:w-auto outline-none border-[#C30F66]" value={current} onChange={(e) => {
                                            setCurrentRetrait(retraitDispo?.find(retrait => retrait.nom === e.target.value));
                                            setCurrent(e.target.value);
                                            setId((retraitDispo?.find(retrait => retrait.nom === e.target.value))?.eventId!);
                                        }}>
                                            <option value="" disabled>Sélectionner l'événement ici</option>
                                            {retraitDispo && retraitDispo.map((retrait, idx) => (
                                                <option key={idx} value={`${retrait.nom}`}>{retrait.nom}</option>
                                            ))}
                                        </select>
                                    </div>}
                                    {!loading && retraitDispo && <div className="flex justify-center items-center text-center">
                                        <div>
                                            <p className="font-bold text-xl ">Solde Net</p>
                                            <p className="mt-2 text-xl">{currentRetrait?.retrait.soldeBrut! + currentRetrait?.retrait.commission!} FCFA</p>
                                            {/* <div className="flex text-sm justify-center items-center mt-5 mb-5">
                                                <div className="p-3 m-2 rounded-lg pl-7 pr-7 " style={{ border: `2px solid ${colors.primary}` }}>
                                                    <p className="font-bold md:text-xl text-sm ">Solde Brut</p>
                                                    <p>{currentRetrait?.retrait.soldeBrut!}</p>
                                                </div>
                                                <div className="p-3 m-2 rounded-lg pl-7 pr-7 " style={{ border: `2px solid ${colors.primary}` }}>
                                                    <p className="font-bold md:text-xl text-sm ">Commision</p>
                                                    <p>{currentRetrait?.retrait.commission!}</p>
                                                </div>
                                            </div> */}
                                            {currentRetrait?.retrait.soldeBrut! + currentRetrait?.retrait.commission! !== 0 && 
                                            <div className="mt-5">
                                                <Link href={`/finances/retrait?id=${id!}`} className={`bg-[${colors.primary}] text-white p-2 my-3 pl-8 pr-8 mt-5 rounded-lg`}>Retrait</Link>
                                            </div>}
                                            
                                        </div>
                                    </div>}

                                    <div className="mt-20">
                                        <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Historique des Transactions </p>
                                        <div className="flex justify-between text-[#C30F66] mt-6 ">
                                            <p>Transaction</p>
                                            <p>Tout</p>
                                        </div>
                                        <div>
                                            {historique && historique?.map((item, idx) => (
                                                <Link href={`/finances/transaction-details?id=${item.id}`} onClick={() => sessionStorage.setItem("transHist", JSON.stringify(item))} key={idx} className="flex justify-between mt-4 pb-3 cursor-pointer hover:opacity-60 text-sm" style={{ borderBottom: '1px solid #dadada' }}>
                                                    <div className="">
                                                        <p className="pt-2">{item.title}</p>
                                                        <p className="pt-2 capitalize" style={{ color: `${item.statut == "en cours" ? '#C30F66' : "#000"}` }}>{item.statut}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="pt-2">-{item.montant} FCFA</p>
                                                        <p className="pt-2">Ev: {item.nom}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    {/* <Link href="/confirmation/step1">Valider</Link> */}
                                </div>
                            )}

                            {session?.user && retraitDispo?.length! == 0 && (
                                <div className="my-10 flex justify-center items-center text-center">
                                    <p className="p-5 border rounded-lg">Aucun retrait disponible pour le moment</p>
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
