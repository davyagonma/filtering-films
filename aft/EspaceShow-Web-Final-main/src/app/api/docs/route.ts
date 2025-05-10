import { environmentUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function GET() {
    const url = "https://web.postman.co/workspace/322e492f-76e0-4095-824c-637be8a32408/documentation/29219729-794b567f-ff20-47c9-aa72-03d46405ff60"
    return NextResponse.redirect(url);

}
