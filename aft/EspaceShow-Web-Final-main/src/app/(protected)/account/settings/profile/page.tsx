import dynamic from 'next/dynamic'

const Profile = dynamic(() => import('@/components/profile'), { ssr: false })

export default function Page() {
    return (
        <div>
            <Profile />
        </div>
    )
}