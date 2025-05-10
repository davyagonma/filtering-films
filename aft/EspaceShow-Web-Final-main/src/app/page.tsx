"use client"
import DropdownComp from "@/components/components/DropdownComp";
import EventCard from "@/components/components/EventCard";
import DropList from "@/components/components/List";
import Spinner from "@/components/components/Spinner"
import Subscription from "@/components/components/Subscription";
import CookieConsent from "@/components/Cookies/cookies";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { EventsTypes } from "@/types/interfaces";
import { Categories } from "@/utils/card";
// import { EventsTypes } from "@/types";
// import { Categories } from "@/utils/card";
import { colors } from "@/utils/constants";
import { Country, Villes, Periode } from "@/utils/dropdown"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function IndexPage() {
  const [current, setCurrent] = useState(0)
  const [cat, setCat] = useState<string[]>(["Tout"])

  const [error, setError] = useState("Chargement des informations...")
  const [events, setEvents] = useState<any[]>()
  const [mount, setMount] = useState(false)
  const [plus, setPlus] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    getCategorie()
    const intervalId = setInterval(() => {
      const ville = typeof localStorage !== 'undefined' ? localStorage.getItem('ville') || "" : ""
      const periode = typeof localStorage !== 'undefined' ? localStorage.getItem('periode') || "" : ""
      const categorie = typeof localStorage !== 'undefined' ? localStorage.getItem('categorie') || "Tout" : "Tout"
      const country = typeof localStorage !== 'undefined' ? localStorage.getItem('country') || "" : ""
      const data = { periode, categorie, country, ville }
      getAllEvents(data);
    }, 1000);
    return () => clearInterval(intervalId);

  }, [])

  const getCategorie = async () => {
    const res = await fetch('/api/events/allCategories')
    const data = await res.json()
    console.log('categories....', data.categorie)
    // setCat([...cat, ...data.categorie])
    setCat(["Tout", ...data.categorie])
  }

  const getAllEvents = (params: any) => {
    // console.log(params)
    fetch(`/api/events/filterBy?category=${params.categorie}&pays=${params.country}&ville=${params.ville}`)
      .then(res => res.json())
      //.then(data => {
      //  setMount(true)
      //  setEvents(data.events)
      //  setPlus(events?.length! >= 9 ? 9 : events?.length!)
      //})
      .then(data => {
        setMount(true)
        setEvents(data.events)
        setPlus(data.events.length >= 9 ? 9 : data.events.length)
        console.log('Events data:', data)
      })      
      .catch(error => {
        console.error("Error", error);
        setMount(false)
        setError('Erreur lors du chargement des informations...')
      })
  }

  return (
    <>
      <Navbar />
      {mount && (
        <>
          <CookieConsent />
          <section className="pt-[50px] md:-mt-0 md:pt-[80px]" style={{ background: 'url(/im1.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.437)', width: '100%', height: '350px', }} className="flex justify-center items-center">
              <h1 className="text-white text-center p-3 text-[15px] md:text-[25px]" style={{ lineHeight: '40px', fontWeight: 'bold' }}>Organisez vos évènements et participez à des <br className="hidden md:block" />évènements en toute quiétude et en toute <br className="hidden md:block" />sécurité !</h1>
            </section>
          </section>
          {(events && events!.length > 0) ? (
            <section>
              <h2 className="p-2 ml-2 mt-4 text-lg font-bold">Evènements populaires</h2>
              <div className={`p-2 flex ${events?.length! < 5 ? 'md:justify-center' : 'justify-start'} items-center w-[100%]`} style={{ overflowX: 'scroll' }}>

                {events && events.length > 0 && events.slice(-5).reverse().map((item: EventsTypes, idx: number) => (
                  <EventCard {...item} key={idx} />
                ))}
              </div>

              <h2 className="p-2 ml-2 mt-4 text-lg font-bold">Catégories</h2>
              <div className="flex justify-center items-center p-2 md:p-5" style={{ flexWrap: 'wrap' }}>
                {cat.map((categorie, idx) => (
                  <button className="w-[100px] m-1 md:w-[150px] rounded-lg md:m-4 p-3 hover:opacity-80"
                    style={{ backgroundColor: `${current == idx ? '#C30F66' : '#EDEDE9'}`, border: '1px solid #dadada', color: `${current == idx ? '#fff' : '#000'}`, fontSize: "12px" }}
                    onClick={() => {
                      // filterEvents()
                      setCurrent(idx)
                      localStorage.setItem('categorie', categorie)
                      localStorage.setItem('pays', "")
                      localStorage.setItem('ville', "")
                      localStorage.setItem('periode', "")
                    }} key={idx}>{categorie}</button>
                ))}
              </div>

              {/* <div className="flex justify-center items-center py-5 px-5" style={{ flexWrap: 'wrap' }}>
                <DropdownComp {...Country} />
                <DropdownComp {...Villes} />
                <DropdownComp {...Periode} />
              </div> */}

              <DropList/>

              <div className="flex justify-center items-center">
                {events!.length! <= 3 ? (
                  <div className="md:flex md:justify-center">
                    {events!.slice(0, plus).reverse().map((item, idx) => (
                      <div className="m-1" key={idx}>
                        <EventCard {...item} key={idx} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {events!.slice(0, plus).reverse().map((item, idx) => (
                      <div className="flex-1 m-1" key={idx}>
                        <EventCard {...item} key={idx} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center mt-5">
                <button onClick={() => {
                  if (plus === events.length) {
                    setPlus(events?.length! >= 3 ? 3 : events?.length!)
                  } else {
                    setPlus((prevPlus) => {
                      const newPlus = prevPlus + 3;
                      return newPlus <= events!.length ? newPlus : events!.length;
                    });
                  }
                }} className="flex justify-center cursor-pointer items-center w-[150px] text-white p-3 rounded-sm" style={{ backgroundColor: `${colors.button}` }}>
                  <span className="w-full">Voir {plus == events.length ? "moins" : "plus"}</span>
                  <svg style={{ marginTop: '2px', marginLeft: '3px' }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0602 8.565L12.0302 4.3275C11.7752 3.9675 11.3627 3.75 10.9202 3.75C9.80268 3.75 9.15768 5.01 9.80268 5.9175L12.0002 9L9.80268 12.0825C9.15018 12.99 9.80268 14.25 10.9202 14.25C11.3627 14.25 11.7827 14.0325 12.0377 13.6725L15.0677 9.435C15.2477 9.1725 15.2477 8.8275 15.0602 8.565Z" fill="white" />
                    <path d="M9.81018 8.565L6.78768 4.3275C6.52518 3.9675 6.11268 3.75 5.67018 3.75C4.55268 3.75 3.90018 5.01 4.55268 5.9175L6.75018 9L4.55268 12.0825C3.90018 12.99 4.55268 14.25 5.67018 14.25C6.11268 14.25 6.53268 14.0325 6.78768 13.6725L9.81768 9.435C9.99768 9.1725 9.99768 8.8275 9.81018 8.565Z" fill="white" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center">
                <Subscription />
              </div>
            </section>
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center text-center">
              <div>
                <p>Aucun évènements programmé. <br />Cliquez ici pour suivre la fomation complète sur l'utilisation de cette plateforme</p>
                <button className={`bg-[${colors.primary}] p-2 rounded-lg text-white py-3 px-4 my-4 `} onClick={() => {
                  sessionStorage.setItem("isAdmin", 'true')
                  router.push('/event/create') // change the route after
                }}>Commencer</button>
              </div>
            </div>
          )}
        </>
      )}

      {!mount && (
        <section className="min-h-[100vh] flex justify-center items-center text-center">
          <div>
            <Spinner />
            <p>{error}</p>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
