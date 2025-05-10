import { randomUUID } from "crypto";
import { headers, mtnBaseUrl } from "../constants";

export const requesttopay = async (uuid:string, amount:string) => {
    if (!uuid ||!amount) {
        throw new Error("Missing required parameters");
    }
    const id = randomUUID();
    const body = {
        "amount": amount,
        "currency": "FCFA",
        "externalId": uuid,
        "payer": {
            "partyIdType": "MSISDN",
            "partyId": id
        },
        "payerMessage": "Achat de ticket",
        "payeeNote": "Achat de ticket"
    };
    try {
        const response = await fetch(`${mtnBaseUrl}/collection/v1_0/requesttopay`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { ...headers }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error);
        throw new Error("Failed to request payment");
    }
}

