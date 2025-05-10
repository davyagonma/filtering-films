"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Ticket from "@/components/components/Ticket";
import CoverUpload from "@/components/components/upload/cover";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Categories } from "@/utils/card";
import { colors } from "@/utils/constants";
import { clearAllTickets, generateRandomCode, getAllTickets } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { GetAllCountries, GetCityByCountryName } from "@/utils/countries/countries";
import { ICity, ICountry } from "country-state-city";
import { useSearchParams } from "next/navigation";
import { EventsTypes } from "@/types/interfaces";

export interface TicketProps {
    type_de_ticket: string;
    nombre_de_place: string;
    prix_ticket: string;
}

export default function CreerEvent() {
    const eventId = useSearchParams()?.get('eventId')!
    const event: EventsTypes = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('ev')!) : null

    const { data: session } = useSession()
    const { toast } = useToast()

    const [code, setEventCode] = useState(event.code!)
    const [nom, setName] = useState(event.nom!)
    const [category, setCategory] = useState(event.categorie!)
    const [pays, setPays] = useState(event.pays!)
    const [ville, setVille] = useState(event.ville!)
    const [description, setDescription] = useState(event.description!)
    const [heure, setHeure] = useState(event.heure!)
    const [date_debut, setHeureDebut] = useState(event.date_debut!)
    const [date_fin, setHeureFin] = useState(event.date_fin)
    const [adresse, setAdresse] = useState(event.adresse!)
    const [mots_cles, setMotsCles] = useState(event.mots_cles.join())
    const [place, setPlace] = useState(event.place_totale_disponible)

    const [countriesList, setCountriesList] = useState<ICountry[]>()
    const [cityList, setCityList] = useState<ICity[]>()
    const [id, setId] = useState<number>(1000)

    useEffect(() => {
        const countrie = GetAllCountries()
        setTicket()
        localStorage.setItem('file', event.cover!)
        setCountriesList(countrie)
        if (pays !== "") {
            const cities = GetCityByCountryName(pays)
            setCityList(cities)
        }
    }, [pays])

    const setTicket = () => {
        let len = 1000
        event?.tickets!.map((tic) => {
            localStorage.setItem(`ticket_${len}`, `${JSON.stringify(tic)}`)
            // console.log(`ticket_${len}`, tic)
            len++
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userId = await JSON.parse(sessionStorage.getItem('user')!).id
        const data = {
            ...{
                userId, nom, pays, ville, description, date_debut, date_fin,
                heure, code
            }, tickets: getAllTickets(), cover: `${localStorage.getItem('file')}`, adresse,
            place_totale_disponible: place,
            categorie: category,
            mots_cles: mots_cles.split(',')
        }
        console.log(data)
        const response = await fetch(`/api/events?eventId=${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()
        console.log(res)
        if (res.success) {
            toast({
                title: "Evenement mis à jour avec succès",
                description: "Vos modifications ont été prise en compte.",
                variant: "default"
            })
            clearAllTickets()
            localStorage.removeItem('file')
            window.location.href = '/event/manage'
        } else {
            toast({
                title: "Une erreur s'est produite",
                description: "Assurez vous d'avoir remplir tous les champs",
                variant: "destructive"
            })
        }
    }

    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] min-h-screen w-[100%] md:w-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="w-full md:w-[auto] md:ml-[150px] flex flex-col justify-center md:justify-start  ">
                        <p style={{ color: `${colors.primary}` }} className="text-xl text-center md:text-start font-bold">Modifier un événement</p>
                        <div className="">
                            <LoginFirst route={"/add-event"} />
                            {session?.user && (
                                <div className="flex justify-center items-center" >
                                    <form id="event-form" className="pt-10 pb-5 w-full col-auto md:flex md:justify-start md:items-start md:gap-20" onSubmit={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}>
                                        <div className="w-full md:w-[350px]">
                                            <div className="flex justify-between items-center pb-5 w-full">
                                                <p className="text-sm">Code de l'événement</p>
                                                <div className="relative">
                                                    <input
                                                        disabled={true}
                                                        value={code}
                                                        onChange={(e) => setEventCode(e.target.value)}
                                                        className={`p-2 rounded-lg text-black text-center w-[100px] ml-4 ${!event.admin_validate ? 'blur-sm' : ''}`}
                                                        style={{
                                                            border: `2px solid ${colors.primary}`,
                                                            outline: 'none',
                                                        }}
                                                        type="text"
                                                    />
                                                    {!event.admin_validate! && <div
                                                        className="absolute inset-0 bg-white bg-opacity-30 rounded-lg"
                                                        style={{ pointerEvents: 'none' }}
                                                    ></div>}
                                                </div>
                                                {/* <input disabled value={code} onChange={(e) => setEventCode(e.target.value)} className="p-2 rounded-lg text-black text-center w-[100px] ml-4 " style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} type="text" /> */}
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm">Nom de l'événement</p>
                                                <input required value={nom} onChange={(e) => setName(e.target.value)} className="p-2 rounded-lg text-black mt-3 w-full " type="text" placeholder="Ex: Gadaa" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>
                                            <div>
                                                <p className="text-sm mt-3 mb-1">Catégorie</p>
                                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }}>
                                                    {Categories.map((item, idx) => (
                                                        <option defaultValue={Categories[0]} value={item} key={idx}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <p className="text-sm mt-3 mb-1">Pays</p>
                                                <select value={pays} onChange={(e) => setPays(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }}>
                                                    <option value="Pays">Pays</option>
                                                    {countriesList?.map((country: ICountry, idx) => (
                                                        <option key={idx} value={country.name}>{country.flag} {country.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <p className="text-sm mt-3 mb-1">Ville</p>
                                                <select value={ville} onChange={(e) => setVille(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }}>
                                                    <option value="Ville">Ville</option>
                                                    {cityList?.map((city, idx) => (
                                                        <option key={idx} value={city.name}>{city.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm">Adresse</p>
                                                <input required value={adresse} onChange={(e) => setAdresse(e.target.value)} className="p-2 rounded-lg text-black mt-3 " type="text" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>

                                            <div>
                                                <p className="text-sm mt-3">Description</p>
                                                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="p-[10px] h-[100px] rounded-lg text-black mt-3 w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none', resize: 'none' }}></textarea>
                                            </div>

                                            <CoverUpload />

                                            <div>
                                                <p className="text-sm mt-3 mb-2">Date de début</p>
                                                <input required value={date_debut} onChange={(e) => setHeureDebut(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" type="date" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-[350px] md:pt-[50px]">
                                            <div>
                                                <p className="text-sm mt-3">Date de fin</p>
                                                <input required value={date_fin} onChange={(e) => setHeureFin(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" type="date" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>

                                            <div>
                                                <p className="text-sm mt-3">Heure de l'événement</p>
                                                <input required value={heure} onChange={(e) => setHeure(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" type="time" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>
                                            <div>
                                                <p className="text-sm mt-3">Mots clés</p>
                                                <input placeholder="mot1, mot2, ..." required value={mots_cles} onChange={(e) => setMotsCles(e.target.value)} className="p-[10px] rounded-lg text-black mt-3 w-full" type="text" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>
                                            <Ticket />

                                            <div>
                                                <p className="text-sm mt-3 mb-2">Nombre total de place disponibles</p>
                                                <input min={1} value={place} onChange={(e) => setPlace(e.target.value)} required placeholder="Ex:500" className="p-[10px] rounded-lg text-black mt-3 w-full" type="number" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                                            </div>
                                            <div>
                                                <button type="submit" className="rounded-lg p-[13px] bg-[#C30F66] text-white w-full mt-10 text-sm ">Modifier l'événement</button>
                                            </div>
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
