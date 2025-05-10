import dynamic from 'next/dynamic'


const Historique = dynamic(() => import('@/components/History/historic'), { ssr: false })

export default function Page() {
    return (
        <div>
            <Historique />
        </div>
    )
}