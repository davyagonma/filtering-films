"use client"

import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export default function Succes() {

    return (
        <section >
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" height={50} alt="Logo" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-20">
                <div className="m-10">
                    <div className="flex justify-center text-center items-center mt-10 mb-10">
                        <p className="mt-10 text-xl">Votre demande de retrait a été <br /> éffectué avec succès.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mt-10" style={{ position: 'absolute', bottom: '150px', right: '150px' }}>
                            <Link href="/finances">
                                <button className="text-white p-2 pl-5 pr-6 " style={{ backgroundColor: `${colors.primary}`, }} type="button">OK</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
