"use client"
import Spinner from '@/components/components/Spinner'
import Navbar from '@/components/Navbar'
import { colors } from '@/utils/constants'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'


export interface Events {
    id: number;
    nom: string;
}

const Search = () => {
    const [searchData, setSearchData] = useState<Events[]>([])
    const [search, setSearch] = useState('')
    const [pending, setPending] = useState(false)

    useEffect(() => {
        const getSearch = async () => {
            if (search !== "") {
                setPending(true)
                const response = await fetch(`/api/search?query=${search.toLocaleLowerCase().trim()}`)
                const events = await response.json()
                setSearchData(events.result)
            }
        }
        getSearch()
    }, [search])

    return (
        <main>
            <Navbar />
            <div className='pt-[90px] p-5 '>
                <div className="flex justify-center p-[5px] items-center" style={{ backgroundColor: '#EDEDE9', borderRadius: '30px' }}>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Rechercher un événement' style={{ width: '250px', padding: '6px', outline: 'none', backgroundColor: 'transparent' }} />
                    <svg className='cursor-pointer' style={{ marginRight: '5px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3047 14.3044L19.0003 19" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.43478 15.8696C12.5409 15.8696 15.8696 12.5409 15.8696 8.43478C15.8696 4.32867 12.5409 1 8.43478 1C4.32867 1 1 4.32867 1 8.43478C1 12.5409 4.32867 15.8696 8.43478 15.8696Z" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {search !== '' && (
                <div className="w-[100vw] bg-white p-5 rounded-lg" style={{ overflow: 'scroll' }}>
                    {/* <div className='flex justify-between items-center'>
                        <p className='py-3'>Résultats pour "<b>{search}</b>"</p>
                        <p className='cursor-pointer font-bold text-lg' onClick={(e) => {
                            e.preventDefault()
                            setSearch('')
                        }}>&times;</p>
                    </div> */}
                    <hr className='-mt-3' />
                    {searchData.length > 0 && (
                        <div className='pt-3'>
                            {searchData.map((item: Events, idx: number) => (
                                <div className=' bg-[#f7f6f6] p-2 mt-3 cursor-pointer flex justify-start items-center' key={idx}>
                                    <Link href={`/event/details?eventId=${item.id}`} className=' bg-[#f7f6f6] w-full ' style={{ borderRadius: '2px', color: `${colors.primary}` }}>
                                        <span dangerouslySetInnerHTML={{ __html: item.nom.replace(new RegExp(search, 'gi'), (match: any) => `<strong>${match}</strong>`) }}></span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchData.length == 0 && (
                        <div className='flex justify-center my-4 items-center'>
                            {pending && <div className='text-center mt-5'>
                                <Spinner />
                                <p>En cours de chargement...</p>
                            </div>}
                            {!pending && <p className='mt-20 text-lg' style={{ opacity: '.6' }}>Aucun résultats trouvé pour votre recherche</p>}
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default Search
