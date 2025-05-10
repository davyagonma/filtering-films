export interface EventsTypes {
    id: string;
    nom: string;
    description: string;
    date_debut: string;
    date_fin: string;
    heure: string;
    cover: string;
    pays: string;
    ville: string;
    adresse: string;
    admin_validate: boolean;
    like: number;
    mots_cles: string[];
    code: string;
    place_totale_disponible: string;
    categorie: string;
    tickets: { prix_ticket: string, type_de_ticket: string, nombre_de_place: string }[];
    organisateur: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    status?: string;
    ticket_vendus?: number,
    commentNbre?: string
    availableRetraitDate?: string

}


export interface UserProps {
    id: string,
    nom: string,
    prenom: string,
    role: string,
    contact: string,
    email: string,
    emailVerified: boolean,
    profile: string,
    createdAt: string,
    updatedAt: string,
    ville?: string,
    pays?: string
}


export interface Reservation {
    avatar: string;           // URL de l'image de l'avatar
    createdAt: string;        // Date et heure de création (ISO format)
    heure: string;            // Heure spécifique
    id: string;               // ID de la réservation
    link: string;             // Lien pour consulter le ticket
    message: string;          // Message de confirmation
    reference: string;        // Référence de la réservation
    updatedAt: string;        // Date et heure de dernière mise à jour (ISO format)
    userId: string;           // ID de l'utilisateur
}
