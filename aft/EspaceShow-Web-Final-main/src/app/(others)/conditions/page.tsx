"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { updatedAt } from "@/utils/constants";
import { useEffect } from "react";

export default function Conditions() {
    useEffect(() => {
        localStorage.removeItem('route')
    }, [])



    const politiques = [
        {
            question: '1. Introduction',
            det: <p>- Les présentes Conditions Générales d'Utilisation régissent l'utilisation de l'application web et mobile de gestion des évènements et des tickets électroniques, ci-après dénommée "Espace Show+", fournie par ADEFORITI FLACANDJI TECH GROUP SARL, ci-après dénommée "AFT GROUP SARL", "nous", "notre" ou "nos".</p>,
        },
        {
            question: "2. Utilisation de l'Application",
            det: <p>- Notre application est destinée à être utilisée par des organisateurs d'événements pour créer, promouvoir et vendre des billets pour leurs événements, ainsi que par des participants pour découvrir, acheter et participer à des événements. L'utilisation de l'application est sujette à notre politique d'utilisation ainsi qu'à toutes les lois et réglementations applicables. Vous acceptez de ne pas utiliser l'Application à des fins illégales ou interdites par ces conditions.</p>,
        },
        {
            question: '3. Création de Compte',
            det: <p>- En tant qu'organisateur d'événements, vous êtes entièrement responsable du contenu que vous publiez sur notre plateforme, y compris les détails de l'événement, les images, les prix des billets, etc. Vous devez vous assurer que votre contenu est légal, conforme aux lois locales et ne viole pas les droits d'autrui.</p>,
        },
        {
            question: "4. Publication d'Événements",
            det: "- En tant qu'organisateur d'événements, vous êtes entièrement responsable du contenu que vous publiez sur notre plateforme, y compris les détails de l'événement, les images, les prix des billets, etc. Vous devez vous assurer que votre contenu est légal, conforme aux lois locales et ne viole pas les droits d'autrui."
        },
        {
            question: "5. Achat de Billets",
            det: <p>- L'Application permet aux utilisateurs d'acheter des billets électroniques pour divers événements. En tant que participant, vous êtes responsable de fournir des informations exactes lors de l'achat de billets pour des événements.</p>,
        },
        {
            question: "6. Contenu Généré par les Utilisateurs",
            det: " - Notre application peut inclure des fonctionnalités permettant aux utilisateurs de publier du contenu, telles que des avis, des commentaires ou des photos. Vous êtes entièrement responsable du contenu que vous publiez et vous acceptez de ne pas publier de contenu diffamatoire, offensant ou illégal.",
        },
        {
            question: '7. Commission',
            det: <p>- Pour chaque transaction de billets effectuée via l'Application, une commission de 10% est prélevée du compte de l'organisateur sur le montant total de la vente. Cette commission est utilisée pour couvrir les coûts de fonctionnement de l'Application.</p>
        },
        {
            question: "8. Responsabilités de l'Utilisateur",
            det: <p>- Vous êtes responsable de maintenir la confidentialité de votre compte et de vos informations de connexion. Vous acceptez de ne pas utiliser l'Application de manière à causer des dommages, une interruption ou un dysfonctionnement de celle-ci.</p>
        },
        {
            question: '9. Protection des Données Personnelles',
            det: <p>- Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité. En utilisant notre application, vous consentez à la collecte, à l'utilisation et au traitement de vos données conformément à cette politique.</p>
        },
        {
            question: "10. Respect des Droits d'Auteur",
            det: <p>- Nous respectons les droits d'auteur et attendons de nos utilisateurs qu'ils fassent de même. Si vous pensez qu'un contenu publié sur notre plateforme viole vos droits d'auteur, veuillez nous contacter immédiatement.</p>
        },
        {
            question: "11. Droits de Propriété Intellectuelle",
            det: <p>- Tous les contenus présents sur l'Application, y compris mais sans s'y limiter, les textes, les images, les logos et les vidéos, sont considérés comme la propriété de AFT GROUP SARL ou de ses concédants de licence.</p>,
        },
        {
            question: "12. Modifications de la Politique",
            det: <p>- Nous nous réservons le droit de modifier, de suspendre ou de mettre fin à tout ou partie de ces Conditions Générales d'Utilisation. Les modifications prendront effet dès leur publication sur notre application. Nous vous encourageons à consulter régulièrement cette politique pour vous tenir informé des changements éventuels</p>
        }
    ]


    return (
        <>
            <Navbar />
            <section className="p-5 pt-[50px] " style={{ minHeight: '80vh' }}>
                <p className="text-xl text-center pb-5 mt-10 font-bold text-[27px] ">Conditions Générales d'Utilisation (CGU)</p>
                <div style={{ margin: 'auto' }} className="w-full md:w-[65%]">
                    <p className="text-justify">Bienvenue sur Espace Show+ ! Nous sommes ravis de vous accueillir sur notre application. Avant d'utiliser notre application "Espace Show+", veuillez prendre quelques instants pour lire attentivement notre politique d'utilisation. En utilisant notre application, vous acceptez les conditions énoncées ci-dessous. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.</p>
                    <div className="">
                        <div>
                            {politiques.map((item, idx) => (
                                <div key={idx}>
                                    <div className="items-center pt-4 text-justify ">
                                        <p className="w-[100%] md:text-[19px] font-bold mr-10 pb-2 ">{item.question}</p>
                                        <div>{item.det}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-7 text-sm font-bold ">
                                <p>Dernière mise à jour: {updatedAt}</p>
                                {/* <p>Espace Show+ by AFT GROUP SARL</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
