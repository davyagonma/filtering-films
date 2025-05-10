import { useToast } from '@/hooks/use-toast';
import { EventsTypes } from '@/types/interfaces';
import { environmentUrl } from '@/utils/url';
import React from 'react'

const ShareComponent = (data:EventsTypes) => {
    const { toast } = useToast()

    const shareData = async (item: EventsTypes | any) => {
        if (!navigator.canShare) {
            toast({
                title: 'Le navigateur ne supporte pas le partage',
                duration: 5000,
                variant: 'destructive'
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
                files: [new File([blob], 'cover.jpeg', { type: blob.type })]
            })
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <p className="pt-4 cursor-pointer" onClick={async () => shareData(data)}>
            {/* <Share/> */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V25C30 27.7614 27.7614 30 25 30H5C2.23858 30 0 27.7614 0 25V5Z" fill="#EF50A1" fillOpacity="0.2" />
                <path d="M9 15V21C9 21.3978 9.15804 21.7794 9.43934 22.0607C9.72064 22.342 10.1022 22.5 10.5 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V15" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 10.5L15 7.5L12 10.5" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 7.5V17.25" stroke="#C30F66" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </p>
    )
}

export default ShareComponent
