import { headers, mtnBaseUrl } from "../constants";
import { randomUUID } from "crypto";

export const disbursement = async(uuid: string, amount: string) => {
    try {
        if (!uuid ||!amount) {
            throw new Error("Missing required parameters");
        }
        const id = randomUUID();
        const body = {
            "amount": amount,
            "currency": "FCFA",
            "externalId": uuid,
            "payee": {
                "partyIdType": "MSISDN",
                "partyId": id
            },
            "payerMessage": "Déboursement",
            "payeeNote": "Déboursement"
        };
        const response = await fetch(`${mtnBaseUrl}/disbursement/v2_0/deposit`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {...headers}
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
    
    } catch (error) {
        console.error(error);
        throw new Error("Failed to disburse payment");
    }
}