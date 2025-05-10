import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categorie = searchParams.get("category")?.trim() || "";
        const pays = searchParams.get("pays")?.trim() || "";
        const ville = searchParams.get("ville")?.trim() || "";

        const baseConditions = {
            status: 'valide',
            admin_validate: true,
            date_fin: {
                gte: new Date().toISOString().split('T')[0],
            },
        };

        // Aucun filtre
        if (!categorie && !pays && !ville) {
            const events = await db.event.findMany({ where: baseConditions });
            return NextResponse.json({ events, success: true }, { status: 200 });
        }

        // "Tout" sélectionné et aucun pays/ville
        if (categorie.toLowerCase() === "tout" && !pays && !ville) {
            const events = await db.event.findMany({ where: baseConditions });
            return NextResponse.json({ events, success: true }, { status: 200 });
        }

        // Catégorie "tout" + pays
        if (categorie.toLowerCase() === "tout" && pays && !ville) {
            const events = await db.event.findMany({
                where: {
                    ...baseConditions,
                    pays,
                },
            });
            return NextResponse.json({ events, success: true }, { status: 200 });
        }

        // Catégorie spécifique + pays (pas de ville)
        if (categorie && pays && !ville) {
            const events = await db.event.findMany({
                where: {
                    ...baseConditions,
                    categorie: { contains: categorie },
                    pays,
                },
            });
            return NextResponse.json({ events, success: true }, { status: 200 });
        }

        // Ville seulement
        if (ville && !categorie && !pays) {
            const events = await db.event.findMany({
                where: {
                    ...baseConditions,
                    ville,
                },
            });
            return NextResponse.json({ events, success: true }, { status: 200 });
        }

        // Tous les filtres actifs
        const events = await db.event.findMany({
            where: {
                ...baseConditions,
                categorie: { contains: categorie },
                pays: { contains: pays },
                ville: { contains: ville },
            },
        });
        return NextResponse.json({ events, success: true }, { status: 200 });

    } catch (error) {
        console.error("Error in GET /api/events/filterBy:", error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}




// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// 
// export async function GET(req: Request) {
//     try {
//         const params = req.url.split('=')
//         const categorie = params[1].split('&')[0].trim()
//         const pays = params[2].split('&')[0].trim()
//         const ville = params[3].trim()
//         // console.log(categorie, pays, ville)
//         if (!categorie && !pays && !ville) {
//             const events = await db.event.findMany({
//                 where: {
//                     admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] },
//                     status: 'valide',
//                 }
//             });
//             return NextResponse.json({ events, success: true }, { status: 200 });
//         } else {
//             if (categorie.toLocaleLowerCase() === "tout" && !pays && !ville) {
//                 const events = await db.event.findMany({
//                     where: {
//                         admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] },
//                         status: 'valide',
//                     }
//                 });
//                 return NextResponse.json({ events, success: true }, { status: 200 });
//             } else if (categorie !== "" && pays !== "" && !ville) {
//                 if (categorie.toLocaleLowerCase() === "tout") {
//                     const events = await db.event.findMany({
//                         where: {
//                             pays: pays,
//                             status: 'valide',
//                             admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] }
//                         }
//                     });
//                     return NextResponse.json({ events, success: true }, { status: 200 });
//                 }
//                 const events = await db.event.findMany({
//                     where: {
//                         pays: pays,
//                         status: 'valide',
//                         categorie: { contains: categorie },
//                         admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] }
//                     }
//                 });
//                 return NextResponse.json({ events, success: true }, { status: 200 });
//             } else if (ville) {
//                 const events = await db.event.findMany({
//                     where: {
//                         ville: ville,
//                         status: 'valide',
//                         admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] }
//                     }
//                 });
//                 // console.log(events)
//                 return NextResponse.json({ events, success: true }, { status: 200 });
//             }
//             const events = await db.event.findMany({
//                 where: {
//                     AND: [
//                         { categorie: { contains: categorie } },
//                         { pays: { contains: pays } },
//                         { ville: { contains: ville } }
//                     ],
//                     status: 'valide',
//                     admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0] }
//                 }
//             });
//             return NextResponse.json({ events, success: true }, { status: 200 });
//         }
//     } catch (error) {
//         return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
//     }
// }