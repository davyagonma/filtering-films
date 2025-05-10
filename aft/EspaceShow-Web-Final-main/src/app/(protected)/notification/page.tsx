import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('@/components/components/Notifications/notif'), { ssr: false })

export default function Page() {
    return (
        <div>
            <NoSSR />
        </div>
    )
}