interface Data {
    title: string,
    options: any;
    icon: string
}

const Country:Data = {
    title: 'Pays',
    options: ["Pays 1", "Pays 2", "Pays 3", "Pays 4", "Pays 5", "Pays 6"],
    icon: "country"
}

const Villes: Data = {
    title: 'Ville',
    options: ["Ville 1", "Ville 2", "Ville 3", "Ville 4", "Ville 5", "Ville 6"],
    icon: "ville"
}

const Periode: Data = {
    title: 'Période',
    options: ["Aujourd'hui", "Cette semaine", "Ce mois","Cette année"],
    icon: "periode"
}

export {Country, Villes, Periode}