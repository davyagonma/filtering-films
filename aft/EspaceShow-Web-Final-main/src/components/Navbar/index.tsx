import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('./nav'), { ssr: false })

export default function Navbar() {
    return (
        <div>
            <NoSSR />
        </div>
    )
}