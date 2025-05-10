"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from 'react-icons/ai'

interface Message {
    role: string,
    content: string,
    date: string,
}

export default function FAQ() {

    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
    const [q5, setQ5] = useState(false)
    const [q6, setQ6] = useState(false)
    const [q7, setQ7] = useState(false)
    const [q8, setQ8] = useState(false)
    const [q9, setQ9] = useState(false)
    const [q10, setQ10] = useState(false)
    const [q11, setQ11] = useState(false)


    const [signe1, setSigne1] = useState('+')
    const [signe2, setSigne2] = useState('+')
    const [signe3, setSigne3] = useState('+')
    const [signe4, setSigne4] = useState('+')
    const [signe5, setSigne5] = useState('+')
    const [signe6, setSigne6] = useState('+')
    const [signe7, setSigne7] = useState('+')
    const [signe8, setSigne8] = useState('+')
    const [signe9, setSigne9] = useState('+')
    const [signe10, setSigne10] = useState('+')
    const [signe11, setSigne11] = useState('+')


    useEffect(() => {
        localStorage.removeItem('route')
    }, [])

    const question = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11]
    const signe = [signe1, signe2, signe3, signe4, signe5, signe6, signe7, signe8, signe9, signe10, signe11]

    const [seeChat, setSeeChat] = useState(false)


    const faq = [
        {
            question: 'Qu’est ce que l’application et quel est son objectif principal ?',
            response: "L'application est une plateforme web et mobile conçue pour faciliter la gestion des tickets électroniques pour divers événements tels que les concerts, les spectacles, les formations, l'art, etc... Notre objectif principal est de simplifier le processus d'achat de billets, de fournir une expérience fluide pour les utilisateurs et rendre la participation aux différents événements plus écologique."
        },
        {
            question: 'Comment fonctionne l’achat de billets sur l’application ?',
            response: "Pour acheter des billets, il vous suffit de parcourir les événements disponibles, sélectionner celui qui vous intéresse, appuyer sur réserver un ticket, remplir ses informations et choisir le type de ticket désiré, puis procéder au paiement sécurisé en ligne."
        },
        {
            question: 'Quels types d’évènements sont disponibles sur l’application ?',
            response: "Notre application propose une variété d'événements tels que des concerts, des spectacles, des formations, des expositions d'art et bien d'autres. Nous nous efforçons d'inclure une large gamme d'événements pour répondre aux goûts divers de notre public."
        },
        {
            question: "Comment puis-je savoir si mon achat de billets a été confirmé avec succès ?",
            response: "Une fois votre achat effectué, vous recevrez une confirmation avec votre billet électronique joint par e-mail ainsi qu'une notification dans l'application indiquant que votre transaction a été réussie. Vous pouvez également consulter vos achats passés dans la section 'Historique des commandes' dans les menus."
        },
        {
            question: "Quelle est la politique de remboursement pour les billets achetés sur l'application ?",
            response: "Les politiques de remboursement varient en fonction du contexte de l'opération. Veuillez consulter les conditions spécifiques liées aux remboursements. En général, les remboursements peuvent être disponibles dans certaines circonstances, telles que l'annulation de l'événement ou du billet acheté."
        },
        {
            question: "Quelle est la commission prélevée par l'application sur les ventes de billets ?",
            response: "Nous prélevons chez les organisateurs d'événements une commission standard de 10% sur chaque transaction de billets effectuée via notre plateforme. Cette commission est utilisée pour couvrir les frais de traitement des paiements, le support client et le développement continu de l'application."
        },
        {
            question: "Puis-je annuler ou modifier mes billets une fois achetés ?",
            response: "OUI, vous pouvez annuler et modifier votre ticket 48 heures (deux jours) avant l'évènement. Pour le faire, contactez nous via le chat d'assistance dans la section 'Aide' des paramètres, dans le centre d'aide."
        },
        {
            question: "Y a-t-il des frais supplémentaires pour l'achat de billets sur l'application ?",
            response: <p>Non, nous ne prenons aucun frais supplémentaire pour l'achat des tickets. <br /> <br /> Cependant, il est important de noter que certains de nos agrégateurs de paiement (tels que les prestataires de cartes bancaires ou autres services de paiement en ligne) peuvent, dans certains cas, vous demander de payer des frais additionnels pour l'utilisation de leurs services. Ces frais sont directement déterminés par ces prestataires et ne sont en aucun cas liés à Espace Show+.</p>
        },
        {
            question: "Comment puis-je contacter le support client en cas de problème ou de question ?",
            response: <p>Si vous rencontrez des problèmes ou si vous avez des questions, n'hésitez pas à nous contacter via le chat d'assistance dans l'application ou par e-mail à <a className="text-[blue]" href="mailto:support@espaceshow-plus.com">support@espaceshow-plus.com</a>. <br /><br /> Notre équipe est là pour vous aider et répondre à toutes vos préoccupations.</p>
        },
        {
            question: "A partir de quand puis-je faire un retrait depuis mon solde en tant qu'organisateur ?",
            response: "Vous pouvez retirer l'argent des tickets vendus pour un évènement seulement 24h après la fin de l'événement. Cette condition est là pour protéger les consommateurs contre l'annulation ou le report de l'événement."
        },
        {
            question: "Combien de temps pour recevoir mon argent en tant que organisateur ?",
            response: "Votre demande de retrait est analysée et traitée sous 72h de jours ouvrés. Après ce délai, vous recevrez une notification indiquant le dépôt du solde sur le compte sélectionné dans vos paramètres de paiement."
        }
    ]

    const seeResponse = (id: number) => {
        if (id == 0) {
            setQ1(!q1)
            setSigne1(signe1 == '+' ? '-' : '+')
        } else if (id == 1) {
            setQ2(!q2)
            setSigne2(signe2 == '+' ? '-' : '+')
        } else if (id == 2) {
            setQ3(!q3)
            setSigne3(signe3 == '+' ? '-' : '+')
        } else if (id == 3) {
            setQ4(!q4)
            setSigne4(signe4 == '+' ? '-' : '+')
        } else if (id == 4) {
            setQ5(!q5)
            setSigne5(signe5 == '+' ? '-' : '+')
        } else if (id == 5) {
            setQ6(!q6)
            setSigne6(signe6 == '+' ? '-' : '+')
        } else if (id == 6) {
            setQ7(!q7)
            setSigne7(signe7 == '+' ? '-' : '+')
        } else if (id == 7) {
            setQ8(!q8)
            setSigne8(signe8 == '+' ? '-' : '+')
        } else if (id == 8) {
            setQ9(!q9)
            setSigne9(signe9 == '+' ? '-' : '+')
        } else if (id == 9) {
            setQ10(!q10)
            setSigne10(signe10 == '+' ? '-' : '+')
        } else if (id == 10) {
            setQ11(!q11)
            setSigne11(signe11 == '+' ? '-' : '+')
        }

    }

    const chatRef = useRef<HTMLDivElement>(null)



    const [msg, setMsg] = useState<string>("")
    const [chat, setChat] = useState<Message[]>([
        {
            role: "bot",
            content: "Bonjour, je suis l'assistant de espace-show +.",
            date: new Date().toDateString()
        }
    ])

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current?.scrollHeight, behavior: "smooth" });
    }, [chat])


    const handleSubmit = (e: Event) => {
        e.preventDefault()
        setChat([...chat, { role: "user", content: msg, date: new Date().toDateString() }, { role: "bot", content: "Merci pour votre question. Vous pouvez consulter les informations sur notre application ou nous contacter via le chat d'assistance.", date: new Date().toDateString() }])
        setMsg("")
        // setTimeout(() => {
        //     setChat([...chat, { role: "bot", content: "Merci pour votre question. Vous pouvez consulter les informations sur notre application ou nous contacter via le chat d'assistance.", date: new Date().toDateString() }])
        // }, 1000)
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[60px] select-none" style={{ minHeight: '80vh' }}>
                <p className="text-xl text-center pb-5 mt-10">Découvrez les questions les plus fréquemment posées ou <br />contactez notre service d’assistance grâce au chat <br />en cas de problème particulier</p>
                <div style={{ margin: 'auto' }} className="w-full md:w-[65%]">
                    <p>FAQ</p>
                    <div className="">
                        <div>
                            {faq.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-betwen items-center pt-4">
                                        <p className="w-[100%] text-[16px] md:text-[17px] mr-10 ">{idx + 1}- {item.question}</p>
                                        <p className="cursor-pointer text-xl " onClick={() => seeResponse(idx)} >{signe[idx]}</p>
                                    </div>
                                    {question[idx] && (
                                        <div className="p-4 mt-3  w-[100%] text-justify border rounded-lg">
                                            <div>{item.response}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cursor-pointer hover:opacity-80" style={{ position: 'fixed', bottom: '40px', right: '30px' }}>
                                <div>
                                    <p onClick={() => setSeeChat(true)} className="mb-[-57px] pt-3 text-center text-sm h-[50px] text-white " style={{ zIndex: '10', position: 'relative' }}>Chat</p>
                                    <Image alt="chat" width={65} height={65} src="/chat.png" style={{ zIndex: '1', }} id="chat" />
                                </div>
                            </div>
                        </div>
                        {seeChat && (
                            <div className="rounded-lg bottom-0 right-0 md:bottom-8 md:right-8 shadow-generate-search"  style={{ position: 'fixed', overflow: 'hidden', zIndex: 100 }}>
                                <div id="chat" style={{ zIndex: '99' }}>
                                    <div className="w-[100%] md:w-[410px] bg-white p-5">
                                        <div className="h-[80vh] md:h-[60vh] ">
                                            <div >
                                                <div className="text-right">
                                                    <p onClick={() => setSeeChat(false)} className="text-xl font-bold text-[#C30F66] cursor-pointer ">&times;</p>
                                                </div>
                                            </div>

                                            <div className="h-[75vh] md:h-[55vh] overflow-auto hideScroll" ref={chatRef}>
                                                {chat.map((message, idx) => (
                                                    <div className={`w-3/4 ${message.role === 'user' ? 'text-right ml-auto' : 'text-left mr-auto'} mb-2`} key={idx}>
                                                        <div className={`w-full ${message.role === 'user' ? 'text-right bg-green-200 ml-auto' : 'text-left bg-blue-200 mr-auto'} rounded-lg p-3`}>
                                                            <p className="text-sm">{message.content}</p>
                                                        </div>
                                                        <p className="text-[9px] text-slate-500">{message.date}</p>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                        <div>
                                            <form onSubmit={(e) => handleSubmit(e as any)} className="flex justify-start items-center rounded-lg bg-[#EDEDE9]" style={{ border: '1px solid #C30F66', overflow: 'hidden' }}>
                                                <div>
                                                    <input value={msg} onChange={(e) => setMsg(e.target.value)} className="w-[280px] md:w-[328px] p-2 " type="text" placeholder="Message" style={{ outline: 'none', }} />
                                                </div>
                                                <div>
                                                    <button className="bg-[#C30F66] p-2 " type="submit">
                                                        <AiOutlineSend size={25} className="text-[#fff]" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
