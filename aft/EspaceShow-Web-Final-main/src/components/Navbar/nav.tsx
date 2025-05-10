'use client';
import { useState, useEffect } from 'react'
import { siteConfig } from '@/utils/config';
import { colors } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '../components/Menu';
import { UserButton } from '../components/UserButton';
import Spinner from '../components/Spinner';
import { useSession } from 'next-auth/react';
import { checkIfUserIsAdmin } from '@/utils/services';


export interface Events {
    id: number;
    nom: string;
}

const Nav = () => {
    const check = checkIfUserIsAdmin()
    const { data: session } = useSession()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const [isCurrent, setIsCurrent] = useState(0)
    const [search, setSearch] = useState('')
    
    const [toggle, setToggle] = useState(false)
    const [pending, setPending] = useState(false)
    const [notif, setNotif] = useState(0)

    const [searchData, setSearchData] = useState<Events[]>([])

    useEffect(() => {
        getNotification()
        const getSearch = async () => {
            if (search !== "") {
                setPending(true)
                const response = await fetch(`/api/search?query=${search.toLocaleLowerCase().trim()}`)
                const events = await response.json()
                setSearchData(events.result)
                // setSearchData(events)
            }
        }
        getSearch()
    }, [search, notif])

    const getNotification = async () => {
        if (user) {
            const response = await fetch(`/api/notifications/lenght?userId=${user.id!}`)
            const data = await response.json()
            setNotif(data.length)
            sessionStorage.setItem('notif', data.length.toString())
        }
    }

    const setRoute = () => {
        sessionStorage.setItem('current_route', window.location.pathname)
    }

    useEffect(() => {
        if (window.location.pathname == '/') {
            setIsCurrent(0)
        } else if (window.location.pathname == '/event/create') {
            setIsCurrent(1)
        } else if (!check && window.location.pathname == '/history') {
            setIsCurrent(1)
        } else if (window.location.pathname == '/event/manage' || window.location.pathname.includes('/update')) {
            setIsCurrent(2)
        }
    }, [])

    const [seeMenu, setSeeMenu] = useState(false)


    return (
        <nav className='flex fixed select-none w-[100vw] justify-between items-center md:h-[80px] px-5 py-2 bg-white z-50' style={{ boxShadow: '1px 1px 2px #6C757D', position: 'fixed' }}>
            <div className='flex justify-center items-center'>
                <div className="logo">
                    {!session?.user && (
                        <p onClick={() => setSeeMenu(!seeMenu)} className='mr-5  block md:hidden'><Image src="/logo.png" height={50} alt="Logo" width={83} className="cursor-pointer" /></p>
                    )}
                    {session?.user && (
                        <div className='block md:hidden'>
                            <svg style={{ cursor: 'pointer' }} onClick={() => setToggle(true)} width="33" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.625 20C35.625 20.4973 35.4275 20.9742 35.0758 21.3258C34.7242 21.6775 34.2473 21.875 33.75 21.875H6.25C5.75272 21.875 5.27581 21.6775 4.92417 21.3258C4.57254 20.9742 4.375 20.4973 4.375 20C4.375 19.5027 4.57254 19.0258 4.92417 18.6742C5.27581 18.3225 5.75272 18.125 6.25 18.125H33.75C34.2473 18.125 34.7242 18.3225 35.0758 18.6742C35.4275 19.0258 35.625 19.5027 35.625 20ZM6.25 11.875H33.75C34.2473 11.875 34.7242 11.6775 35.0758 11.3258C35.4275 10.9742 35.625 10.4973 35.625 10C35.625 9.50272 35.4275 9.02581 35.0758 8.67417C34.7242 8.32254 34.2473 8.125 33.75 8.125H6.25C5.75272 8.125 5.27581 8.32254 4.92417 8.67417C4.57254 9.02581 4.375 9.50272 4.375 10C4.375 10.4973 4.57254 10.9742 4.92417 11.3258C5.27581 11.6775 5.75272 11.875 6.25 11.875ZM33.75 28.125H6.25C5.75272 28.125 5.27581 28.3225 4.92417 28.6742C4.57254 29.0258 4.375 29.5027 4.375 30C4.375 30.4973 4.57254 30.9742 4.92417 31.3258C5.27581 31.6775 5.75272 31.875 6.25 31.875H33.75C34.2473 31.875 34.7242 31.6775 35.0758 31.3258C35.4275 30.9742 35.625 30.4973 35.625 30C35.625 29.5027 35.4275 29.0258 35.0758 28.6742C34.7242 28.3225 34.2473 28.125 33.75 28.125Z" fill="#C30F66" fillOpacity="0.88" />
                            </svg>
                        </div>
                    )}
                    <p onClick={() => setSeeMenu(!seeMenu)} className='mr-5 select-none hidden md:block'><Image src="/logo.png" alt="Logo" height={50} width={83} className="cursor-pointer" /></p>
                    {seeMenu && <div className='absolute menuShadow rounded-lg bg-white p-2 top-[64px] left-0 md:left-auto md:top-[85px]'>
                        <Menu />
                    </div>}
                </div>

                <div className='hidden md:flex justify-center items-center'>
                    <div className="navlinks">
                        <ul className='flex justify-center items-center'>
                            {siteConfig.navItems.map((item, idx) => (
                                <li key={idx} className='ml-5 cursor-pointer mr-5 py-1' style={{ borderBottom: `${(isCurrent == idx) ? `2px solid ${colors.primary}` : ""}` }}>
                                    <Link onClick={() => setRoute()} className='text-black hover:opacity-50' href={item.href}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center items-center ml-5" style={{ backgroundColor: '#EDEDE9', padding: '5px', borderRadius: '30px' }}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Rechercher un événement' style={{ width: '250px', padding: '6px', outline: 'none', backgroundColor: 'transparent' }} />
                        <svg className='cursor-pointer' style={{ marginRight: '5px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3047 14.3044L19.0003 19" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.43478 15.8696C12.5409 15.8696 15.8696 12.5409 15.8696 8.43478C15.8696 4.32867 12.5409 1 8.43478 1C4.32867 1 1 4.32867 1 8.43478C1 12.5409 4.32867 15.8696 8.43478 15.8696Z" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <div>
                {!user && (
                    <div className='flex justify-center items-center'>
                        <div>
                            <Link className={`bg-[#C30F66] text-[#fff] p-[10px] rounded-lg md:bg-transparent md:text-black`} href='/sign-in'>Se connecter</Link>
                        </div>
                        <div>
                            <Link className='hidden md:flex' style={{ backgroundColor: `${colors.primary}`, color: '#fff', padding: "10px", paddingLeft: '32px', paddingRight: '32px', marginLeft: '20px', borderRadius: '8px' }} href='/sign-up'>S'inscrire</Link>
                        </div>
                    </div>
                )}

                {user && (
                    <div className='flex justify-start items-center'>
                        <Link href='/notification'>
                            <div className='cursor-pointer mt-3'>
                                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 10.6667C24 8.54492 23.1571 6.51009 21.6569 5.0098C20.1566 3.50951 18.1217 2.66666 16 2.66666C13.8783 2.66666 11.8434 3.50951 10.3431 5.0098C8.84286 6.51009 8 8.54492 8 10.6667C8 20 4 22.6667 4 22.6667H28C28 22.6667 24 20 24 10.6667Z" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.3067 28C18.0722 28.4041 17.7358 28.7395 17.331 28.9727C16.9261 29.2059 16.4672 29.3286 16 29.3286C15.5328 29.3286 15.0738 29.2059 14.669 28.9727C14.2642 28.7395 13.9277 28.4041 13.6933 28" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {notif !== 0 && <p className='flex justify-center items-center top-[15px] md:top-[20px] ' style={{ position: 'absolute', backgroundColor: `${colors.primary}`, color: '#fff', textAlign: 'center', borderRadius: '50%', width: '22px', height: '22px', fontSize: '9px', marginLeft: '15px' }}> <span style={{}}>{notif}</span></p>}
                            </div>
                        </Link>
                        <div className='ml-5'>
                            <UserButton />
                        </div>
                    </div>
                )}
            </div>

            {search !== '' && (
                <div className="w-[80%] ml-[7%] md:w-[50%] md:ml-[25%] shadow-generate-search bg-white mt-2 p-5 rounded-lg" style={{ position: 'absolute', top: '80px', maxHeight: '330px', minHeight: '330px', height: '330px', overflow: 'scroll' }}>
                    <div className='flex justify-between items-center'>
                        <p className='py-3'>Résultats pour "<b>{search}</b>"</p>
                        <p className='cursor-pointer font-bold text-lg' onClick={(e) => {
                            e.preventDefault()
                            setSearch('')
                        }}>&times;</p>
                    </div>
                    <hr />
                    {searchData.length > 0 && (
                        <div className='pt-3'>
                            {searchData.map((item: Events, idx: number) => (
                                <div className=' bg-[#f7f6f6] p-2 mt-3 cursor-pointer flex justify-start items-center' key={idx}>
                                    <Link href={`/event/details?eventId=${item.id}`} className=' bg-[#f7f6f6] w-full ' style={{ borderRadius: '2px', color: `${colors.primary}` }}>
                                        <span dangerouslySetInnerHTML={{ __html: item.nom.replace(new RegExp(search, 'gi'), (match) => `<strong>${match}</strong>`) }}></span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchData.length == 0 && (
                        <div className='flex justify-center items-center'>
                            {pending && <div className='text-center mt-5'>
                                <Spinner />
                                <p>En cours de chargement...</p>
                            </div>}
                            {!pending && <p className='mt-20 text-lg' style={{ opacity: '.6' }}>Aucun résultats trouvé pour votre recherche</p>}
                        </div>
                    )}
                </div>
            )}

            {toggle && (
                <div id="search" className="bg-[#fff] p-7 rounded-xl" style={{ position: 'absolute', top: '0px', left: '0px', boxShadow: '2px 2px 2px #dadada', borderTop: '2px solid #dadada', zIndex: 10 }}>
                    <div className='flex justify-between items-center mb-6'>
                        <Link href='/' onClick={() => setToggle(false)} className='mr-5 '><Image src="/logo.png" height={50} alt="Logo" width={83} className="cursor-pointer" /></Link>
                        <p onClick={() => setToggle(false)} className='cursor-pointer font-bold text-[#C30F66]' style={{ fontSize: '30px' }}>&times;</p>
                    </div>
                    <Menu />
                </div>
            )}

        </nav>
    )
}

export default Nav
