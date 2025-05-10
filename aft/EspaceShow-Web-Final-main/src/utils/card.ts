

const GetDataFromApi = () => {
    const CardData = [
        {
            id: 0,
            cover: "/im1.webp",
            title: 'Grand concert de Dadju',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },
        {
            id: 1,
            cover: "/im1.webp",
            title: 'Grand concert de GIMS',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },
        {
            id: 2,
            cover: "/im1.webp",
            title: 'Grand concert de Nicanor',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },
        {
            id: 3,
            cover: "/im1.webp",
            title: 'Grand concert de Vano',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },
        {
            id: 4,
            cover: "/im1.webp",
            title: 'Grand concert de Togbè',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },
        {
            id: 5,
            cover: "/im1.webp",
            title: 'Grand concert de King Messanh',
            date: 'Ven 15/08/2023',
            location: 'Cotonou, Palais des congrès',
            locate: 'Cotonou, Wologuèdè',
            hours: '18:00',
            organisateur: 'John DOE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus non nisl aliquet ullamcorper. Sed auctor odio nec ligula sodales, ac condimentum leo finibus. Suspendisse potenti. Integer auctor mauris nec mi tincidunt, a tincidunt odio congue. Ut euismod et odio ac tristique. Fusce sodales orci et urna vehicula, a consectetur libero sagittis. Nam at magna purus. Sed sit amet volutpat mi, non bibendum est. In in erat non tortor facilisis commodo. Sed nec varius libero. Donec eu quam sit amet justo sagittis sodales eu vel velit.'
        },

    ]

    return CardData
}



const CardData = GetDataFromApi()


const Categories = ["Tout", "Concert", "Formation", "Spectacle", "Art", "Chill", "SchoolEvents", "Sport", "Gala"]

export { CardData, Categories }