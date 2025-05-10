"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { updatedAt } from "@/utils/constants";
import { useEffect } from "react";

export default function Ventes() {
    useEffect(() => {
        localStorage.removeItem('route')
    }, [])



    const politiques = [
        {
            question: 'Préambule',
            det: '',
            details: [
                {
                    title: '',
                    detail: <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Espace Show+ (la "Plateforme") et toute personne physique ou morale utilisant la Plateforme pour organiser ou participer à des événements, ou acheter des tickets électroniques (l'Utilisateur). </p>
                },
                {
                    title: '',
                    detail: <p>En utilisant la Plateforme, l'Utilisateur accepte sans réserve l'ensemble des dispositions des présentes CGV.</p>
                },
                {
                    title: '',
                    detail: <p>Espace Show+ est une application de gestion d'événements et de tickets électroniques, régie par les lois de la République du Bénin.</p>
                },
            ]
        },
        {
            question: 'Article 1 : Objet',
            det: '',
            details: [
                {
                    title: '',
                    detail: <p>Les présentes CGV ont pour objet de définir les conditions dans lesquelles les Utilisateurs peuvent accéder à la Plateforme Espace Show+, organiser des événements, vendre ou acheter des billets électroniques, et utiliser les services proposés par la Plateforme.</p>
                }
            ]
        },
        {
            question: 'Article 2 : Acceptation des CGV',
            det: "",
            details: [

                {
                    title: '',
                    detail: <p>L’utilisation de la Plateforme est subordonnée à l’acceptation des présentes CGV par l’Utilisateur. En s’inscrivant sur Espace Show+ ou en utilisant les services proposés, l’Utilisateur reconnaît avoir pris connaissance des CGV et les accepter dans leur intégralité.</p>
                }
            ]
        },
        {
            question: 'Article 3 : Inscription et accès au service',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>L’inscription sur Espace Show+ est gratuite. Pour organiser un événement ou acheter des billets, l’Utilisateur doit créer un compte "organisateur" ou "participant" en fournissant des informations exactes et à jour. Espace Show+ se réserve le droit de refuser l’inscription de tout Utilisateur ne respectant pas les présentes CGV.</p>
                },
                {
                    title: '',
                    detail: <p>L’Utilisateur est seul responsable des informations fournies et s’engage à ne pas usurper l’identité de tiers. Toute tentative de fraude pourra entraîner la suspension ou la suppression immédiate du compte.</p>
                }
            ]
        },
        {
            question: 'Article 4 : Modalités de paiement et frais de service',
            det: '',
            details: [
                {
                    title: '',
                    detail: <p>Les transactions financières sur Espace Show+ sont sécurisées via des prestataires de paiement tiers. Le prix des billets est déterminé par l’Organisateur de l’événement, et Espace Show+ n'applique aucun frais de service supplémentaire à la vente des billets.</p>
                },
                {
                    title: '',
                    detail: <p>Cependant, il est important de noter que certains de nos agrégateurs de paiement (tels que les prestataires de cartes bancaires ou autres services de paiement en ligne) peuvent, dans certains cas, vous demander de payer des frais additionnels pour l'utilisation de leurs services. Ces frais sont directement déterminés par ces prestataires et ne sont en aucun cas liés à Espace Show+.</p>
                },
                {
                    title: '',
                    detail: <p>Nous vous encourageons à vérifier les conditions d'utilisation des services de paiement que vous choisissez, afin de connaître d'éventuels frais qui pourraient être appliqués lors du traitement de votre paiement.</p>
                },
                {
                    title: '',
                    detail: <p>L'Utilisateur garantit disposer des autorisations nécessaires pour utiliser le mode de paiement sélectionné.</p>
                }
            ]
        },
        {
            question: "Article 5 : Organisation d'événements",
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>Tout Utilisateur souhaitant organiser un événement sur Espace Show+ doit respecter les lois en vigueur au Bénin, notamment celles relatives à la sécurité, à l’ordre public, à la protection des mineurs, et aux droits de propriété intellectuelle. L’Organisateur est seul responsable de la bonne organisation de son événement, ainsi que du respect des réglementations locales. 
                    <br /><br />Espace Show+ décline toute responsabilité en cas d'annulation, de report ou de mauvaise exécution de l'événement par l'Organisateur.</p>
                }
            ]
        },
        {
            question: 'Article 6 : Politique d’annulation et de remboursement',
            det: "",
            details: [
                {
                    title: '- Participants',
                    detail: <p>En tant que participant vous pouvez annuler votre ticket 48 heures (deux jours) avant l'évènement. Cependant en cas d'annulation de votre part, vous payez un pourcentage égale à 30% de la valeur de votre ticket comme indemnité à la Plateforme. Espace Show+ vous retournera les 70% restant après validation de votre demande d'annulation. <br /><br />Pour le faire, contactez nous via le chat d'assistance dans la section "Aide" des paramètres, dans le centre d'aide. Ou par mail: <a href="mailto:support@espaceshow-plus.com" className="text-blue-500">support@espaceshow-plus.com</a> <br /><br />Espace Show+ décline toute responsabilité en cas de non traitement d'une demande d'annulation adressée au delà du délai précisé dans cet article.</p>
                },
                {
                    title: '- Organisateurs',
                    detail: <p>Les politiques d’annulation et de remboursement sur la Plateforme sont identiques pour chaque Organisateur d’événements. <br /><br /> En cas d’annulation d’un événement, l’Organisateur s’engage à informer les participants et Espace Show+ dans les plus brefs délais et à procéder aux remboursements conformément à la loi applicable.</p>
                }
            ]
        },
        {
            question: 'Article 7 : Responsabilité de Espace Show+',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>Espace Show+ n’est responsable que de la fourniture des services de mise en relation et de billetterie en ligne. Espace Show+ ne peut être tenu responsable des différends entre Utilisateurs, ni de l’exécution ou de l’organisation des événements. Espace Show+ décline toute responsabilité en cas de perte financière ou préjudice moral résultant d’un événement organisé via la Plateforme. <br /><br /> Toutefois, Espace Show+ s’engage à prendre toutes les mesures nécessaires pour garantir la sécurité des transactions et la confidentialité des données personnelles des Utilisateurs, conformément à la législation en vigueur au Bénin.</p>
                }
            ]
        },
        {
            question: 'Article 8 : Données personnelles',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>Les informations collectées par Espace Show+ lors de l’inscription ou de l’utilisation de la Plateforme sont soumises à la loi n° 2017-20 du 20 avril 2018 relative à la protection des données à caractère personnel en République du Bénin. Les Utilisateurs disposent d’un droit d’accès, de modification et de suppression de leurs données personnelles. <br /><br /> Espace Show+ s’engage à ne pas vendre ni partager les données personnelles des Utilisateurs à des tiers sans leur consentement, sauf obligation légale.</p>
                }
            ]
        },
        {
            question: 'Article 9 : Propriété intellectuelle',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>L’ensemble des contenus publiés sur Espace Show+ (textes, images, logos, vidéos, etc.) est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction, modification ou utilisation non autorisée des contenus sans l’accord préalable de Espace Show+ est strictement interdite. <br /><br />  Les Utilisateurs conservent la propriété intellectuelle des contenus qu’ils publient sur la Plateforme, mais concèdent à Espace Show+ une licence d’utilisation non exclusive pour la promotion et l’amélioration des services.</p>
                }
            ]
        },
        {
            question: 'Article 10 : Modification des CGV',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>Espace Show+ se réserve le droit de modifier à tout moment les présentes CGV. Les Utilisateurs seront informés de toute modification substantielle, et les nouvelles conditions entreront en vigueur 30 jours après leur notification. Si l’Utilisateur n’accepte pas les nouvelles CGV, il devra cesser d’utiliser la Plateforme.</p>
                }
            ]
        },
        {
            question: 'Article 11 : Loi applicable et juridiction compétente',
            det: "",
            details: [
                {
                    title: '',
                    detail: <p>Les présentes CGV sont régies par les lois de la République du Bénin. Tout litige relatif à leur interprétation ou exécution sera soumis à la compétence exclusive du tribunal de Cotonou.</p>
                }
            ]
        }
    ]


    return (
        <>
            <Navbar />
            <section className="p-5 pt-[60px]" style={{ minHeight: '80vh' }}>
                <p className="text-xl text-center pb-5 mt-10 font-bold text-[27px] ">Conditions Générales de Vente de Espace Show+</p>
                <div style={{ margin: 'auto' }} className="w-full md:w-[65%]">
                    <div className="">
                        <div>
                            {politiques.map((item, idx) => (
                                <div key={idx}>
                                    <div className="items-center pt-4 text-justify ">
                                        <p className="w-[100%] md:text-[19px] font-bold mr-10 pb-2 ">{item.question}</p>
                                        <div >{item.det}</div>
                                        {item.details.map((det, index) => (
                                            <div className="mt-4" key={index}>
                                                <p className="w-[100%] md:text-[17px] font-bold mr-10 pb-2 ">{det.title}</p>
                                                <div className="text-[15px]">{det.detail}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-7 text-sm font-bold ">
                                <p>Dernière mise à jour: {updatedAt} </p>
                                <p>Espace Show+ by AFT GROUP SARL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
