import { useToast } from "@/hooks/use-toast"
import { EventsTypes } from "@/types/interfaces";
import { colors } from "@/utils/constants";
import { environmentUrl } from "@/utils/url";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactionsComponent from "./Reaction";
import ShareComponent from "./Reaction/share";



const EventCard = (item: EventsTypes) => {
    const {toast} = useToast()
    const [like, setlike] = useState(false)
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null

    const [isSharing, setSharing] = useState(false); 

    const shareData = async (item: EventsTypes) => {
        if (!navigator.canShare) {
            toast({
                title: 'Le navigateur ne supporte pas le partage',
                duration: 5000,
                variant:'destructive'
            });
            return;
        }
        const res = await fetch(`${item.cover}`)
        const blob = await res.blob()
        
        try {
            await navigator.share({
                title: item.nom,
                url: `${environmentUrl()}/event/details?eventId=${item.id}`,
                text: `${item.description} ${item.nom}`,
                files: [new File([blob], 'cover.jpeg', {type: blob.type})]
            })
        } catch (error) {
            console.error(error)
        }

    }

    const likeEvent = async () => {
        try {
            const response = await fetch(`/api/events/like`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: item.id})
            })
            const data = await response.json()
            if (data.success) {
                setlike(!like)
            }
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div className="cursor-pointer select-none min-w-[270px] md:min-w-[300px] h-[370px] max-w-[320px] " style={{ overflow: 'hidden', backgroundColor: `${colors.card}`, margin: '10px', borderRadius: '20px' }} >
            <div className="" style={{}}>
                <Link href={`/event/details?eventId=${item.id}`} className="w-[100%] " style={{ background: `url(${item?.cover})`, height: '200px', overflow: 'hidden', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', objectFit: 'cover' }}>
                    <Image alt="" width={400} height={0} loading="lazy" quality={50} className="h-[170px] " src={`${item.cover}`} style={{ borderRadius: '0px' }} />
                </Link>
            </div>
            <div style={{ padding: '10px', marginTop: '0px' }}>
                <p className="" style={{ color: `${colors.button}`, fontSize: '14px', fontWeight: 'bold' }}>{item.nom}</p>
                <div className="flex justify-between items-center ">
                    <div className="mt-4">
                        <div className="flex justify-start items-center">
                            <svg style={{ marginLeft: '-2px' }} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5_296)">
                                    <path d="M15.834 3.53662H4.16732C3.70708 3.53662 3.33398 3.91345 3.33398 4.37829V16.1616C3.33398 16.6265 3.70708 17.0033 4.16732 17.0033H15.834C16.2942 17.0033 16.6673 16.6265 16.6673 16.1616V4.37829C16.6673 3.91345 16.2942 3.53662 15.834 3.53662Z" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83398 3.53664V1.8533M14.1673 3.53664V1.8533" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83398 9.42831H14.1673" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83398 12.795H11.6673" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.8327 4.37833H4.16602V6.90333H15.8327V4.37833Z" fill="#C30F66" fillOpacity="0.88" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5_296">
                                        <rect width="20" height="20.2" fill="white" transform="translate(0 0.169983)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.date_debut}</span>
                        </div>

                        <div className="flex justify-start items-center mt-3">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_5_279" >
                                    <path d="M7.625 17.59C7.625 17.59 13.25 13.045 13.25 8.12125C13.25 4.98369 10.7315 2.44 7.625 2.44C4.5185 2.44 2 4.98369 2 8.12125C2 13.045 7.625 17.59 7.625 17.59Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                                    <path d="M7.625 10.3938C7.92047 10.3938 8.21306 10.335 8.48604 10.2208C8.75902 10.1066 9.00706 9.93918 9.21599 9.72816C9.42492 9.51713 9.59066 9.26662 9.70373 8.9909C9.8168 8.71519 9.875 8.41968 9.875 8.12125C9.875 7.82283 9.8168 7.52732 9.70373 7.25161C9.59066 6.97589 9.42492 6.72538 9.21599 6.51435C9.00706 6.30333 8.75902 6.13594 8.48604 6.02174C8.21306 5.90753 7.92047 5.84875 7.625 5.84875C7.02826 5.84875 6.45597 6.08818 6.03401 6.51435C5.61205 6.94053 5.375 7.51855 5.375 8.12125C5.375 8.72396 5.61205 9.30198 6.03401 9.72816C6.45597 10.1543 7.02826 10.3938 7.625 10.3938Z" fill="black" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                </mask>
                                <g mask="url(#mask0_5_279)">
                                    <path d="M-1.375 0.924988H16.625V19.105H-1.375V0.924988Z" fill="#C30F66" fillOpacity="0.88" />
                                </g>
                            </svg>
                            <span style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.adresse}</span>
                        </div>

                    </div>

                    <div className="flex justify-start items-center">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_5_65)">
                                <path d="M14.166 2.98114C15.4229 3.71411 16.4685 4.76591 17.1992 6.03243C17.9299 7.29895 18.3205 8.73626 18.3322 10.2021C18.3439 11.6679 17.9764 13.1114 17.266 14.3897C16.5557 15.6679 15.5271 16.7367 14.2821 17.4901C13.037 18.2434 11.6188 18.6553 10.1678 18.685C8.71671 18.7147 7.28314 18.3611 6.00898 17.6592C4.73482 16.9573 3.66424 15.9315 2.90324 14.6833C2.14223 13.4351 1.71719 12.0078 1.67018 10.5427L1.66602 10.27L1.67018 9.99727C1.71685 8.5437 2.13564 7.12715 2.88572 5.88572C3.63579 4.64429 4.69156 3.62034 5.95009 2.9137C7.20862 2.20707 8.62697 1.84185 10.0669 1.85367C11.5067 1.86549 12.919 2.25393 14.166 2.98114ZM9.99935 5.21997C9.79524 5.22 9.59823 5.29568 9.44571 5.43267C9.29318 5.56966 9.19573 5.75843 9.17185 5.96316L9.16602 6.06164V10.27L9.17352 10.3802C9.19252 10.5263 9.24912 10.6647 9.33768 10.7817L9.41018 10.8659L11.9102 13.3909L11.9885 13.4599C12.1347 13.5744 12.3144 13.6366 12.4993 13.6366C12.6843 13.6366 12.864 13.5744 13.0102 13.4599L13.0885 13.39L13.1577 13.3109C13.2711 13.1633 13.3326 12.9818 13.3326 12.795C13.3326 12.6081 13.2711 12.4266 13.1577 12.279L13.0885 12.1999L10.8327 9.92068V6.06164L10.8268 5.96316C10.803 5.75843 10.7055 5.56966 10.553 5.43267C10.4005 5.29568 10.2035 5.22 9.99935 5.21997Z" fill="#EF50A1" />
                            </g>
                            <defs>
                                <clipPath id="clip0_5_65">
                                    <rect width="20" height="20.2" fill="white" transform="translate(0 0.169922)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span style={{ fontSize: '13px', paddingLeft: '5px' }}>{item.heure}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center" >
                        {/* TODO Remplacer ceci par une icone de coeur */}
                        {/* <div onClick={() => likeEvent()} className="mr-2 mt-4 cursor-pointer bg-[#EDCEDA] p-[3.3px] rounded-lg ">
                            {!like && (
                                <AiOutlineHeart size={25} color="#EF50A1" className="" />
                            )}
                            {like && (
                                <AiFillHeart size={25} color="#EF50A1" className="" />
                            )}
                        </div> */}

                        <ReactionsComponent userId={user?.id} eventId={item.id} />

                        <Link className="pr-2 pt-4 cursor-pointer" href={`/event/details?eventId=${item.id}`} onClick={() => {
                            localStorage.setItem('modal', "visible")
                        }}>
                            {/* <ChatBubbleIcon/> */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 9C5 8.20435 5.31607 7.44129 5.87868 6.87868C6.44129 6.31607 7.20435 6 8 6H22C22.7956 6 23.5587 6.31607 24.1213 6.87868C24.6839 7.44129 25 8.20435 25 9V19C25 19.7956 24.6839 20.5587 24.1213 21.1213C23.5587 21.6839 22.7956 22 22 22H17.828C17.5628 22.0001 17.3085 22.1054 17.121 22.293L15.254 24.16C14.054 25.361 12 24.51 12 22.812C12 22.5966 11.9145 22.3901 11.7622 22.2378C11.6099 22.0856 11.4034 22 11.188 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V9ZM10 9C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10C21 9.73478 20.8946 9.48043 20.7071 9.29289C20.5196 9.10536 20.2652 9 20 9H10ZM10 13C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15H20C20.2652 15 20.5196 14.8946 20.7071 14.7071C20.8946 14.5196 21 14.2652 21 14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H10ZM10 17C9.73478 17 9.48043 17.1054 9.29289 17.2929C9.10536 17.4804 9 17.7348 9 18C9 18.2652 9.10536 18.5196 9.29289 18.7071C9.48043 18.8946 9.73478 19 10 19H14C14.2652 19 14.5196 18.8946 14.7071 18.7071C14.8946 18.5196 15 18.2652 15 18C15 17.7348 14.8946 17.4804 14.7071 17.2929C14.5196 17.1054 14.2652 17 14 17H10Z" fill="#C30F66" fillOpacity="0.88" />
                                <rect width="30" height="30" rx="5" fill="#EF50A1" fillOpacity="0.2" />
                            </svg>
                        </Link>

                        {/* Add sharing here */}
                        <ShareComponent {...item}/>
                        {/* <p className="pt-4 cursor-pointer" onClick={ async () => shareData(item)}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V25C30 27.7614 27.7614 30 25 30H5C2.23858 30 0 27.7614 0 25V5Z" fill="#EF50A1" fillOpacity="0.2" />
                                <path d="M9 15V21C9 21.3978 9.15804 21.7794 9.43934 22.0607C9.72064 22.342 10.1022 22.5 10.5 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V15" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 10.5L15 7.5L12 10.5" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 7.5V17.25" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </p> */}
                    </div>

                    <div className="pt-5">
                        <Link className="text-white flex justify-between items-center" href={`/ticket?eventId=${item.id}`} style={{ backgroundColor: `${colors.button}`, padding: '6px', borderRadius: '7px' }}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.27566 3.39281L6.95452 4.04067C7.06085 4.14214 7.20881 4.19557 7.36587 4.18919C7.52292 4.18281 7.67619 4.11716 7.79197 4.00666C7.90775 3.89617 7.97654 3.7499 7.98323 3.60002C7.98991 3.45014 7.93393 3.30894 7.8276 3.20747L7.14874 2.5596L8.45836 1.30979C8.63034 1.14567 8.83175 1.01283 9.05108 0.918881C9.27041 0.824929 9.50338 0.771696 9.73667 0.762222C9.96996 0.752749 10.199 0.787218 10.4107 0.863666C10.6225 0.940112 10.8128 1.05704 10.9707 1.20777L12.3755 2.54838C12.4583 2.6275 12.5112 2.73138 12.5268 2.84571C12.5423 2.96003 12.5198 3.07919 12.4624 3.18678C12.3469 3.40211 12.3016 3.64075 12.3325 3.86977C12.3635 4.09878 12.4693 4.30687 12.6354 4.46532C12.8014 4.62376 13.0195 4.72474 13.2594 4.75432C13.4994 4.78389 13.7495 4.74061 13.9751 4.63044C14.2064 4.51787 14.4746 4.55165 14.644 4.71336L16.0488 6.05397C16.2068 6.2047 16.3293 6.38628 16.4094 6.58835C16.4895 6.79041 16.5256 7.00901 16.5157 7.23164C16.5058 7.45428 16.45 7.6766 16.3515 7.88592C16.2531 8.09524 16.1139 8.28744 15.9419 8.45157L14.6323 9.70138L13.9534 9.05352C13.8471 8.95205 13.6991 8.89863 13.5421 8.90501C13.385 8.91138 13.2318 8.97704 13.116 9.08753C13.0002 9.19802 12.9314 9.34429 12.9247 9.49417C12.918 9.64405 12.974 9.78526 13.0803 9.88673L13.7592 10.5346L8.08418 15.9504C7.73685 16.2819 7.27703 16.4789 6.80587 16.498C6.33472 16.5171 5.89083 16.3569 5.57185 16.0525L4.16708 14.7118C3.9971 14.5496 3.96223 14.2942 4.08019 14.0735C4.19563 13.8581 4.24099 13.6195 4.21 13.3905C4.179 13.1614 4.07319 12.9534 3.90717 12.7949C3.74114 12.6365 3.52309 12.5355 3.28312 12.5059C3.04314 12.4763 2.79308 12.5196 2.56744 12.6298C2.45471 12.6846 2.32985 12.7061 2.21005 12.6913C2.09025 12.6764 1.9814 12.626 1.8985 12.5469L0.493728 11.2063C0.174749 10.9018 0.0068118 10.4782 0.0268609 10.0286C0.0469101 9.57895 0.253303 9.14013 0.600636 8.80866L6.27566 3.39281ZM9.49857 4.80212C9.39225 4.70065 9.24428 4.64723 9.08723 4.65361C8.93018 4.65999 8.77691 4.72564 8.66113 4.83613C8.54535 4.94662 8.47655 5.09289 8.46987 5.24277C8.46319 5.39265 8.51917 5.53386 8.62549 5.63533L9.18248 6.16688C9.28881 6.26835 9.43677 6.32178 9.59382 6.3154C9.75088 6.30902 9.90415 6.24336 10.0199 6.13287C10.1357 6.02238 10.2045 5.87611 10.2112 5.72623C10.2179 5.57635 10.1619 5.43515 10.0556 5.33368L9.49857 4.80212ZM11.726 6.92782C11.6197 6.82635 11.4717 6.77293 11.3147 6.77931C11.1576 6.78569 11.0043 6.85134 10.8886 6.96183C10.7728 7.07232 10.704 7.21859 10.6973 7.36847C10.6906 7.51835 10.7466 7.65956 10.8529 7.76103L11.4094 8.29207C11.5157 8.39354 11.6637 8.44696 11.8207 8.44059C11.9778 8.43421 12.131 8.36855 12.2468 8.25806C12.3626 8.14757 12.4314 8.0013 12.4381 7.85142C12.4448 7.70154 12.3888 7.56033 12.2825 7.45886L11.726 6.92782ZM6.34396 11.2346C6.23763 11.1331 6.18166 10.9919 6.18834 10.842C6.19502 10.6922 6.26382 10.5459 6.3796 10.4354L8.41678 8.49125C8.53256 8.38076 8.68584 8.3151 8.84289 8.30872C8.99994 8.30235 9.1479 8.35577 9.25423 8.45724C9.36055 8.55871 9.41653 8.69992 9.40985 8.8498C9.40317 8.99967 9.33437 9.14595 9.21859 9.25644L7.18141 11.2006C7.06563 11.3111 6.91235 11.3767 6.7553 11.3831C6.59825 11.3895 6.45029 11.3361 6.34396 11.2346ZM7.68031 12.5099C7.57398 12.4084 7.518 12.2672 7.52469 12.1174C7.53137 11.9675 7.60017 11.8212 7.71594 11.7107L8.58902 10.8775C8.7048 10.767 8.85808 10.7014 9.01513 10.695C9.17218 10.6886 9.32014 10.742 9.42647 10.8435C9.5328 10.945 9.58877 11.0862 9.58209 11.2361C9.57541 11.3859 9.50661 11.5322 9.39083 11.6427L8.51775 12.4759C8.40197 12.5864 8.2487 12.6521 8.09165 12.6584C7.9346 12.6648 7.78663 12.6114 7.68031 12.5099Z" />
                            </svg>
                            <span className="text-[10px] pl-[0.5px] md:pl-1">Réserver un ticket</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventCard
