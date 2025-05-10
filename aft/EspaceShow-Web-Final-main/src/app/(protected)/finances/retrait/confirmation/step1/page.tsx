"use client"

import { UserProps } from "@/types/interfaces";
import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";


export default function ReceiveCode() {
    const user:UserProps = typeof sessionStorage !== "undefined" ? JSON.parse(sessionStorage.getItem('user')!) : null


    return (
        <section suppressHydrationWarning>
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" alt="Logo" height={50} width={106} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center md:w-full w-[90%] items-center mt-20 m-5">
                <div>
                    <h2 className="text-center font-medium text-2xl mb-[30px]">Confirmation de retrait</h2>
                    <p className="mt-20 text-center text-sm">Obtenir un code de vérification pour confirmer votre <br />demande de retrait</p>
                    <div>
                        <form autoComplete="false">
                            <div>
                                <div className="flex justify-center items-center mt-10">
                                    {/* <input style={{ color: `${colors.primary}`, backgroundColor: `${colors.primary}` }} type="radio" defaultChecked /> */}
                                    <p className="ml-2">Un code vous est envoyé par mail à {user?.email!}</p>
                                </div>
                                {/* <div className="flex justify-center items-center mt-2 ml-[-61px] ">
                                    <input style={{ color: `${colors.primary}`, backgroundColor: `${colors.primary}` }} type="radio" />
                                    <p className="ml-2">Par sms au 000000000</p>
                                </div> */}
                            </div>
                            <div className="flex justify-center items-center mt-10">
                                <Link href="/finances/retrait" className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "150px" }}>
                                    <button type="button">Précédent</button>
                                </Link>
                                <Link href={`/finances/retrait/confirmation/step2?email=${user?.email!}`} >
                                    <button className={`rounded-lg text-white text-sm hover:opacity-80 flex justify-center items-center m-5 cursor-pointer`} style={{ backgroundColor: `${colors.primary}`, outline: 'none', padding: '15px', width: "150px" }} type="submit">Suivant</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>

    );
}
