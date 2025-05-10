"use client"

import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export default function PassSuccess() {


    return (
        <section >
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image height={50} src="/logo.png" alt="Logo" width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-20">
                <div>
                    <h2 className="text-center font-medium text-2xl mb-[30px]">Votre mot de passe a été réinitialisé avec succès!</h2>
                    <div className="flex justify-center items-center pt-10 pb-5">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM35.7269 11.7096L40.921 16.9037L24.6979 33.1299L19.5343 38.2904L14.3402 33.0963L9.07896 27.832L14.2395 22.6715L19.5008 27.9358L35.7269 11.7096Z" fill="#C30F66" fillOpacity="0.88" />
                        </svg>
                    </div>


                    <div>
                        <div className="mt-10 flex justify-center items-center">
                            <Link href="/sign-in" className={`rounded-lg text-white text-sm hover:opacity-80`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '10px', width: "auto", paddingLeft: '100px', paddingRight: '100px' }}>Connexion</Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
}
