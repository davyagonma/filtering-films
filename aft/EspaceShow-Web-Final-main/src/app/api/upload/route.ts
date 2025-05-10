import { environmentUrl } from "@/utils/url";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: Request) {
    const data = await req.formData()
    try {
        const file: File | null = data.get('file') as unknown as File
        if (!file) {
            return NextResponse.json({ success: false, message: 'file is required' }, { status: 404 })
        }
        const uploadDir = join(process.cwd(), 'public/upload');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const newFileName = `${timestamp}_${uuidv4()}.${extension}`;
        const path = join(process.cwd(), 'public/upload', newFileName); 
        await writeFile(path, buffer);

        const url = `/upload/${newFileName}`

        const uploadUrl = `${environmentUrl()}/upload/${newFileName}` 

        return NextResponse.json({ success: true, message: 'file uploaded successfully', file: url })
    } catch (error) {
        console.error(error)  
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
    }

}