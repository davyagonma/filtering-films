import React, { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const ReactionsComponent = (props: { userId: string, eventId: string }) => {
    const { userId, eventId } = props
    const [like, setLike] = useState<boolean>(false)

    const likeEvent = async () => {
        try {
            const response = await fetch(`/api/setUserLike`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId, userId })
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div onClick={() => {
            setLike(!like)
            likeEvent()
        }} className="mr-2 mt-4 cursor-pointer bg-[#EDCEDA] p-[3.3px] rounded-lg ">
            {!like && (
                <AiOutlineHeart size={25} color="#EF50A1" className="" />
            )}
            {like && (
                <AiFillHeart size={25} color="#EF50A1" className="" />
            )}
        </div>
    )
}

export default ReactionsComponent
