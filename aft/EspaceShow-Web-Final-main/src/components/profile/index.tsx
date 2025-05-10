"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UploadProfile from "@/components/profile/upload";
import { useToast } from "@/hooks/use-toast";
import { UserProps } from "@/types/interfaces";
import { colors } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Profile() {
    const { data: session } = useSession()
    const { toast } = useToast()
    const userInfos: UserProps = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null

    const [name, setNom] = useState(userInfos?.nom!);
    const [firstname, setPrenom] = useState(userInfos?.prenom!);
    const [telephone, setTelephone] = useState(userInfos?.contact!);
    const [pays, setPays] = useState(userInfos?.pays ? userInfos.pays : "");
    const [ville, setVille] = useState(userInfos?.ville ? userInfos.ville : "");

    const handleUpdateUser = async (e: Event) => {
        e.preventDefault()
        const profile = localStorage.getItem('url')! || userInfos?.profile
        const data = { nom: name, prenom: firstname, contact: telephone, pays, ville, profile, email: userInfos?.email! }
        // console.log(data)
        const res = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        if (!res.ok) {
            toast({
                title: "Erreur",
                description: result.message,
                variant: "destructive"
            })
        }
        toast({
            title: "Mise à jour réussie",
            description: "Vos informations ont été mises à jour avec succès",
            variant: "default"
        })
        sessionStorage.setItem('user', JSON.stringify(result.user))
        window.location.reload()

    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="md:ml-10 w-[100%] md:w-[800px] ">
                        <p style={{ color: `${colors.primary}` }} className="text-center md:ml-10 md:text-justify text-xl font-bold">Informations du profile</p>
                        <div className="flex justify-center items-center w-[100%] md:w-[900px] p-3">
                            <LoginFirst route={"/account/settings/profile"} />
                            {session?.user && (
                                <div className="flex justify-center items-center" style={{ minHeight: '50vh', width: '100%', margin: 'auto' }}>
                                    <form className="mt-4 w-full" onSubmit={(e => handleUpdateUser(e as any))}>

                                        <div>
                                            {/* <div style={{ margin: 'auto' }}>
                                                <Image alt="" height={0} width={100} className="rounded-full w-[120px] h-[120px] ml-[75%] md:ml-[370px] mb-[-30px] " style={{ border: '3px solid #C30F66', zIndex: '-1', objectFit: 'cover' }} src={profile} />
                                            </div>
                                            <div className="ml-[180px] md:ml-[455px] z-50">
                                                <input value={photo} onChange={(e) => handleChangePhoto(e as any)} id="photo" className="mt-[-40px] opacity-0 w-[40px] " style={{ position: 'relative' }} type="file" accept="image/*" />
                                                <p className="mt-[-40px] bg-[#C30F66] z-10 rounded-full cursor-pointer pl-[5px] pt-1 w-[40px] h-[40px] " style={{ border: '2px solid #fff' }}>
                                                    <AiFillCamera className="cursor-pointer" size={25} color="#fff" style={{}} />
                                                </p>
                                            </div> */}
                                            <UploadProfile image={userInfos?.profile!} />
                                            <p className="text-center text-xl p-7 text-[#C30F66] ">{firstname} {name} </p>
                                        </div>


                                        <div className="md:grid md:grid-cols-2 w-full">
                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Nom</p>
                                                <input value={name} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" />
                                            </div>
                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Prénom</p>
                                                <input value={firstname} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" />
                                            </div>
                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Email</p>
                                                <input placeholder="Email" value={userInfos?.email!} className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="email" disabled />
                                            </div>
                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Numéro de téléphone</p>
                                                <input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Téléphone" className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="tel" />
                                            </div>

                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Pays</p>
                                                <input value={pays} onChange={(e) => setPays(e.target.value)} placeholder="Pays" className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" />
                                            </div>
                                            <div className="m-3">
                                                <p className="text-sm opacity-80">Ville</p>
                                                <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" className="p-2 rounded-lg w-[100%] mt-1  " style={{ outline: 'none', border: '2px solid #C30F66' }} type="text" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center mt-5">
                                            <button type="submit" className="text-center bg-[#C30F66] p-2 pl-5 pr-5 text-white rounded-lg " >Valider</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
