// export const config = {
//     port: 587,
//     host: "smtp.gmail.com",
//     auth: {
//         user: "espaceshowplus@gmail.com",
//         pass: 'uhwv hvrx xvjr kqdd',
//     },
//     secure: false,
// }
// export const from = "espaceshowplus@gmail.com"


// export const config = {
//     port: 465,
//     host: "smtp.gmail.com",
//     auth: {
//         user: "charbelzmk@gmail.com",
//         pass: 'afjk hkpv onzl oxuj',
//     },
//     secure: true,
// }
// export const from = "charbelzmk@gmail.com"

// export const config = {
//     port: 587,
//     host: "mail.espaceshow-plus.com",
//     auth: {
//         user: "contact@espaceshow-plus.com",
//         pass: '@DeLaPertinence2024',
//     },
//     secure: false, 
//     tls: {
//         rejectUnauthorized: false,
//     },
// }
// export const from = "contact@espaceshow-plus.com"

export const config = {
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: "espaceshowplus@gmail.com",
        pass: 'uhwv hvrx xvjr kqdd',
    },
    secure: false, 
    tls: {
        rejectUnauthorized: false,
    },
}
export const from = "espaceshowplus@gmail.com"


export const colors = {
    "primary": "#C30F66",
    "card": "#EDEDE9",
    "button": "#F48C06",
    "detail": "#F8F9FA"
}
export const updatedAt = '27 Octobre 2024'

// "dev": "next dev --experimental-https",
export const mtnBaseUrl = "https://proxy.momoapi.mtn.com"
export const API_ACCESS = "MFS AFT GROUP DIS SP"
export const API_USER = "0fb9ea87-65fb-4ab8-9191-f42271da713e"
export const API_KEY = "e0fe48bb30aa4604b0d773b46450daa4"
export const PROVIDER_CALLBACK_URL = "www.espaceshow-plus.com"
export const PAYEMENT_SERVER_URL = "https://espaceshow-plus.com/disbursement/callback"
export const TARGET_ENVIRONNEMENT = "mtnbenin"
export const SUBSCRIPTION_KEY = "20a43dbf412e46e1bc5d501e702af158"

export const headers = {
    'Authorization': API_KEY,
    'X-Target-Environment': TARGET_ENVIRONNEMENT,
    'X-Callback-Url': PROVIDER_CALLBACK_URL,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
}


// export const KKIA_KEY = process.env.KKIA_KEY || "cabfba1b83254cc15370fd8ffb233ac7b890b795"
export const FEEX_KEY = "fp_Pr5cZgBHLjedtx1Jz6gN3kVrPMypB6PBpw3cDOcd8rH67BiFHMVKU15LlM6ZKOXu"

