import dynamic from 'next/dynamic'

const Manage = dynamic(() => import('@/components/manage/Manage'), { ssr: false })

export default function Page() {
    return (
        <div>
            <Manage />
        </div>
    )
}