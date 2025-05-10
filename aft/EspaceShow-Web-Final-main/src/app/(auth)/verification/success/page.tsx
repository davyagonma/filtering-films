import { colors } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

// This is a Success page
export default function Success() {
    return (
        <section >
            <div className="flex justify-center md:justify-start ">
                <Link href="/"><Image src="/logo.png" alt="Logo" width={106} height={50} className="mt-[39px] ml-[21px] cursor-pointer" /></Link>
            </div>

            <div className="flex justify-center items-center mt-20">
                <div className="m-5">
                    <div className="text-center">
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl pr-5" style={{ color: `${colors.primary}` }}>Vérification réussie ! </h1>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0C6.71572 0 0 6.71572 0 15C0 23.2843 6.71572 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71572 23.2843 0 15 0ZM21.4361 7.02575L24.5526 10.1422L14.8187 19.878L11.7206 22.9742L8.60413 19.8578L5.44738 16.6992L8.5437 13.6029L11.7004 16.7614L21.4361 7.02575Z" fill="#C30F66" fillOpacity="0.88" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-5 mb-10">
                        <p>Votre compte a été créé avec succès.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-10">
                            <Image alt="success" height={50} width={106} loading="lazy" src="/success.png" />
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <Link href="/sign-in">
                                <button className="text-white rounded-lg" style={{ backgroundColor: `${colors.primary}`, padding: '13px 120px 13px 120px' }} type="button">Connexion</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
