import { checkIfUserIsAdmin } from "@/utils/services";


export type SiteConfig = typeof siteConfig;

const data = {
    name: "Espace Show +",
    description: "Organisez vos événements et participez à des événements en toute quiétude et en toute sécurité.",
    navItems: [
        {
            label: "Accueil",
            href: "/",
        },
        {
            label: "Créer un événement",
            href: "/event/create",
        },
        {
            label: "Gérer mes événements",
            href: "/event/manage",
        }
    ]
};

const data2 = {
    name: "Espace Show +",
    description: "Organisez vos événements et participez à des événements en toute quiétude et en toute sécurité.",
    navItems: [
        {
            label: "Accueil",
            href: "/",
        },
        // {
        //     label: "Historique des commandes",
        //     href: "/history",
        // },
    ]
};



export const siteConfig = checkIfUserIsAdmin() ? data : data2

