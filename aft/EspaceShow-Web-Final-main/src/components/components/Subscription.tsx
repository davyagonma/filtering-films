import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState } from "react"

const Subscription = () => {
    const [email, setEmail] = useState('')
    const { toast } = useToast()

    const handleSubsribe = async (e: Event) => {
        e.preventDefault()
        const res = await fetch('/api/subscriber', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        if (!res.ok) {
            const data = await res.json()
            toast({
                title: "Erreur",
                description: data.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Espace show +",
                description: "Vous avez bien été inscrit à la newsletter",
                variant: "default"
            })
            setEmail('')
        }
    }
    return (
        <div className="md:flex mb-20 md:justify-between w-[90%] md:w-[60%] mt-10 bg-[#9B4793] p-5 rounded-xl">
            <div className="">
                <p className="text-white w-[100%] md:w-[80%] pt-3">Abonnez-vous à notre newsletter pour être toujours au courant des prochains événements passionnants !</p>
                <form className="flex flex-col" onSubmit={(e) => handleSubsribe(e as any)}>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)}  style={{ outline: 'none', padding: '10px', marginTop: '30px' }} className="w-[100%] md:w-[80%] rounded-sm bg-[#d69fd27c] text-white" type="email" placeholder="Entrez votre email..." />
                    <button type="submit" className="text-white bg-[#F48C06] p-2 w-[100%] md:w-[80%] rounded-sm mt-3">Souscrire</button>
                </form>
            </div>
            <div>
                <Image alt="newsletter" width={320} height={100} src="/newsletter.png" />
            </div>
        </div>
    )
}

export default Subscription
