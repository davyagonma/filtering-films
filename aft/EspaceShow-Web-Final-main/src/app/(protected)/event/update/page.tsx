"use client"
import dynamic from 'next/dynamic'

const CreerEvent = dynamic(() => import('@/components/Event/update'), { ssr: false })

export default function Page() {
    return (
        <div>
            <CreerEvent />
        </div>
    )
}