import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// une route get qui va retourner la colonne 'catégorie' des évents avec admin validate = true 
export async function GET(req:Request) {
    const categories = await db.event.findMany({
        where: { admin_validate: true },
        select: { categorie: true },
    });
    const uniqueCategories = Array.from(new Set(categories.map(category => category.categorie)));

    const response:string[] = uniqueCategories;
    // console.log(category.categorie);
    return NextResponse.json({ categorie:response, success: true }, { status: 200 });
}