import dynamic from 'next/dynamic'


const NoSSR = dynamic(() => import('@/components/Localisation'), { ssr: false })

export default function Page() {
    return (
        <div>
            <NoSSR />
        </div>
    )
}