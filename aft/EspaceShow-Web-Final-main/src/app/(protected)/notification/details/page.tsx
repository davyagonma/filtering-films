import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('@/components/components/Notifications/details'), { ssr: false })

export default function Page() {
    return (
        <div>
            <NoSSR />
        </div>
    )
}