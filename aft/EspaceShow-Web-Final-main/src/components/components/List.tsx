import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Periode } from '@/utils/dropdown';


interface Data {
    title: string,
    options: any;
    icon: string;
}

const DropList = () => {

    const [countries, setCountries] = useState([]);
    const [pays, setPays] = useState('Pays')
    const [ville, setVille] = useState('Ville')
    const [villes, setVilles] = useState<string[]>([])


    const DropData = [
        {
            icon: <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M35 20C35 17.0333 34.1203 14.1332 32.4721 11.6665C30.8238 9.19972 28.4811 7.27713 25.7403 6.14181C22.9994 5.0065 19.9834 4.70945 17.0737 5.28823C14.1639 5.86701 11.4912 7.29562 9.3934 9.3934C7.29562 11.4912 5.86701 14.1639 5.28823 17.0737C4.70945 19.9834 5.0065 22.9994 6.14181 25.7403C7.27713 28.4811 9.19972 30.8238 11.6665 32.4721C14.1332 34.1203 17.0333 35 20 35M6.00001 15H34M6.00001 25H19.1667" stroke="#9B4793" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.1674 5C16.3597 9.49935 14.8711 14.6964 14.8711 20C14.8711 25.3036 16.3597 30.5006 19.1674 35M20.8341 5C23.5294 9.31623 25.0114 14.2792 25.1241 19.3667M33.6674 33.6667L36.6674 36.6667M25.0008 30C25.0008 31.3261 25.5275 32.5979 26.4652 33.5355C27.4029 34.4732 28.6747 35 30.0008 35C31.3268 35 32.5986 34.4732 33.5363 33.5355C34.474 32.5979 35.0008 31.3261 35.0008 30C35.0008 28.6739 34.474 27.4021 33.5363 26.4645C32.5986 25.5268 31.3268 25 30.0008 25C28.6747 25 27.4029 25.5268 26.4652 26.4645C25.5275 27.4021 25.0008 28.6739 25.0008 30Z" stroke="#9B4793" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, label: 'Pays'
        },
        {
            icon: <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M35 20C35 17.0333 34.1203 14.1332 32.4721 11.6665C30.8238 9.19972 28.4811 7.27713 25.7403 6.14181C22.9994 5.0065 19.9834 4.70945 17.0737 5.28823C14.1639 5.86701 11.4912 7.29562 9.3934 9.3934C7.29562 11.4912 5.86701 14.1639 5.28823 17.0737C4.70945 19.9834 5.0065 22.9994 6.14181 25.7403C7.27713 28.4811 9.19972 30.8238 11.6665 32.4721C14.1332 34.1203 17.0333 35 20 35M6.00001 15H34M6.00001 25H19.1667" stroke="#9B4793" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.1674 5C16.3597 9.49935 14.8711 14.6964 14.8711 20C14.8711 25.3036 16.3597 30.5006 19.1674 35M20.8341 5C23.5294 9.31623 25.0114 14.2792 25.1241 19.3667M33.6674 33.6667L36.6674 36.6667M25.0008 30C25.0008 31.3261 25.5275 32.5979 26.4652 33.5355C27.4029 34.4732 28.6747 35 30.0008 35C31.3268 35 32.5986 34.4732 33.5363 33.5355C34.474 32.5979 35.0008 31.3261 35.0008 30C35.0008 28.6739 34.474 27.4021 33.5363 26.4645C32.5986 25.5268 31.3268 25 30.0008 25C28.6747 25 27.4029 25.5268 26.4652 26.4645C25.5275 27.4021 25.0008 28.6739 25.0008 30Z" stroke="#9B4793" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>, label: 'Ville'
        },
        {
            icon: <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 33.3333V9.99998C35 8.16165 33.505 6.66665 31.6667 6.66665H28.3333V3.33331H25V6.66665H15V3.33331H11.6667V6.66665H8.33333C6.495 6.66665 5 8.16165 5 9.99998V33.3333C5 35.1716 6.495 36.6666 8.33333 36.6666H31.6667C33.505 36.6666 35 35.1716 35 33.3333ZM15 30H11.6667V26.6666H15V30ZM15 23.3333H11.6667V20H15V23.3333ZM21.6667 30H18.3333V26.6666H21.6667V30ZM21.6667 23.3333H18.3333V20H21.6667V23.3333ZM28.3333 30H25V26.6666H28.3333V30ZM28.3333 23.3333H25V20H28.3333V23.3333ZM31.6667 15H8.33333V11.6666H31.6667V15Z" fill="#9B4793" />
            </svg>, label: 'Période'
        },
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCountryFromDb();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const getCountryFromDb = async () => {
        const res = await fetch('/api/country')
        if (res.ok) {
            const data = await res.json()
            setCountries(data.pays)
            // console.log(data.pays)
        }
    }

    if (countries.length === 0) {
        return null;
    }

    return (
        <div className="flex justify-center items-center py-5 px-5" style={{ flexWrap: 'wrap' }}>
            {DropData.map((data, idx) => (
                <div key={idx} className="my-3 mx-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger style={{ outline: 'none' }}>
                            <div className="flex justify-between items-center bg-white pl-4 pr-4 pt-2 pb-2 md:w-[300px] w-[320px] rounded-lg" style={{ boxShadow: '0px 1px 1px #dadada', border: '1px solid #dadada' }}>
                                <div className="flex justify-start items-center">
                                    {data.icon}
                                    {data.label === 'Pays' && <p style={{ cursor: "pointer" }} className="ml-3">{pays}</p>}
                                    {data.label === 'Ville' && <p style={{ cursor: "pointer" }} className="ml-3">{ville}</p>}
                                    {data.label === 'Période' && <p style={{ cursor: "pointer" }} className="ml-3">{data.label}</p>}
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', paddingLeft: '6px', paddingTop: '2px', color: '#000', }}>&#9660;</span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={` ml-0 w-[300px] max-h-[${data.label === "Période" ? "auto" : '400px'}] overflow-scroll`}>
                            <DropdownMenu>
                                {data.label === "Pays" && countries?.map((option: { pays: string, villes: string[] }, idx) => (
                                    <DropdownMenuItem key={idx} textValue={option.pays} onClick={() => {
                                        setPays(option.pays);
                                        setVilles(option.villes)
                                        localStorage.setItem('country', option.pays)
                                    }}>
                                        <div className="flex justify-start items-center">
                                            <p className="">{option?.pays}</p>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                                {data.label === "Ville" && villes.length !== 0 && villes?.map((option, idx) => (
                                    <DropdownMenuItem key={idx} textValue={option} onClick={() => {
                                        setVille(option)
                                        localStorage.setItem('ville', option)
                                    }}>
                                        <div className="flex justify-start items-center">
                                            <p className="">{option}</p>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                                {data.label === "Ville" && villes.length === 0 &&  (
                                    <DropdownMenuItem key={idx} onClick={() => { }}>
                                        <div className="flex justify-start items-center">
                                            <p className="">Séléctionnez d'abord un pays</p>
                                        </div>
                                    </DropdownMenuItem>
                                )}
                                {data.label === "Période" && Periode?.options.map((option: string, idx: number) => (
                                    <DropdownMenuItem key={idx} textValue={option} onClick={() => {
                                        localStorage.setItem('periode', option)
                                    }}>
                                        <div className="flex justify-start items-center">
                                            <p className="">{option}</p>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenu>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div >
            ))}
        </div>
    )
}

export default DropList
