import { db } from "@/lib/db";
import { SendEmail } from "@/utils/email";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const body = await req.json()
    const {userId,eventId, montant, moyen, phone_number, titulaire} = body
    console.log(body)

    try {
        if (!userId || !eventId || !montant || !moyen || !phone_number || !titulaire) {
            return NextResponse.json({ message: "All fields are required", success: false },{ status: 400 });
        }
        const user = await db.user.findUnique({where: {id: userId}})
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        const userAccount = await db.userAccount.findUnique({
            where: { eventId },
            select: {
                balance: true
            }
        })
        if (montant > userAccount?.balance!) {
            return NextResponse.json({ message: "Fonds insuffisants pour cette opération", success: false }, { status: 403 });
        }

        const transaction = await db.transaction.create({
            data: {
                userId: userId,
                montant: `${montant}`,
                moyen: moyen,
                account_number: phone_number,
                titulaire: titulaire,
                eventId: eventId
            }
        })

        if (userAccount?.balance === montant*1) {
            await db.event.update({
                where: { id: eventId },
                data: { retrait: true }
            });
        }
        await db.notification.create({
            data: {
                userId: userId,
                title: "Demande de retrait envoyée",
                message: `Votre demande de retrait de ${montant} FCFA via ${moyen} a été enregistrée pour l'événement identifié sous la clé ${eventId!} . Le traitement prendra en moyenne quelques heures. Vous reçevrez un mail dès que le traitement sera effectué`,
            }
        });

        await db.userAccount.update({
            where: { eventId },
            data: { balance: userAccount?.balance! - montant }
        })
        const code = Math.floor(Math.random() * 90000) + 10000; 
        await db.user.update({
            where: { id: userId },
            data: { verificationCode: code.toString() }
        });

        await SendEmail(user?.email!, "Demande de retrait envoyée", `Votre demande de retrait de ${montant} FCFA via ${moyen} a été enregistrée pour l'événement identifié sous la clé ${eventId!}. Le traitement prendra en moyenne quelques heures.<br/> <br/> <br/> Code de retrait: ${code}`)

        const event = await db.event.findUnique({
            where: { id: eventId },
            select: {
                nom: true
            }
        })

        await db.transactionHistory.create({
            data: {
                userId: userId,
                title: `Retrait_${new Date(transaction.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/[/:\s]/g, '-')}`,
                montant: montant,
                nom:event?.nom!,
                statut: "en cours"
            }
        });

        return NextResponse.json({ message: "Retrait enrégistré avec succès", success: true, transaction }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Une erreur s'est produite", success: false }, { status: 500 });
    }

}