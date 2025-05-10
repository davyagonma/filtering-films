import dynamic from 'next/dynamic'

const CreerEvent = dynamic(() => import('@/components/Event'), { ssr: false })

export default function Page() {
    return (
        <div>
            <CreerEvent />
        </div>
    )
}