
import { colors } from "@/utils/constants";
import { clearAllTickets, getAllTickets } from "@/utils/services";
import { useEffect, useState } from "react";
import { TicketProps } from "../Event";


const Ticket = () => {
    const [id, setId] = useState(0);
    const [type_de_ticket, setTypeTicket] = useState('');
    const [nombre_de_place, setPlace] = useState<any>('');
    const [prix_ticket, setPrice] = useState('');

    const [total, setTotal] = useState<number>(0)

    const [allTickets, setAllTickets] = useState<TicketProps[]>(getAllTickets());

    useEffect(() => {
        const interval = setInterval(() => {
            setAllTickets(getAllTickets());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [showForm, setShowForm] = useState<boolean>(true)

    const handleAddTicket = async (e: React.FormEvent<HTMLFormElement>) => {

        const ticket: TicketProps = {
            type_de_ticket: type_de_ticket,
            nombre_de_place: nombre_de_place,
            prix_ticket: prix_ticket
        }
        let task = total + parseInt(ticket.nombre_de_place)
        setTotal(task)
        sessionStorage.setItem('totalPlace', task.toString())
        localStorage.setItem(`ticket_${id}`, `${JSON.stringify(ticket)}`)
        setId(id + 1)
        setTypeTicket('');
        setPlace('');
        setPrice('');
    }

    return (
        <div  className="pt-3">
            {allTickets.length > 0 && (
                <div className="border p-2 rounded-lg">
                    {allTickets.map((ticket, idx) => (
                        <div className="border-b-[1px solid #ccc] flex justify-between items-center py-2 my-1 bg-slate-100 p-2 rounded-lg" key={idx}>
                            <p className="text-[11px] ">{`Type: ${ticket.type_de_ticket}, Prix: ${ticket.prix_ticket}f, Nombre de places: ${ticket.nombre_de_place}`}</p>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div>
                    <div>
                        <p className="text-sm">Type de ticket</p>
                        <input value={type_de_ticket} onChange={(e) => setTypeTicket(e.target.value)} required className="p-[10px] rounded-lg text-black mt-3 w-full" type="text" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                    </div>
                    <div>
                        <p className="text-sm mt-3">Prix du ticket</p>
                        <input value={prix_ticket} onChange={(e) => setPrice(e.target.value)} required className="p-[10px] rounded-lg text-black mt-3 w-full" type="text" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                    </div>
                    <div>
                        <p className="text-sm mt-3 mb-2">Nombre de tickets disponibles</p>
                        <input value={nombre_de_place} onChange={(e) => setPlace(e.target.value)} required min={1} placeholder="Ex:25" className="p-[10px] rounded-lg text-black mt-3 w-full" type="number" style={{ border: `2px solid ${colors.primary}`, outline: 'none' }} />
                    </div>
                    <div className="flex text-sm justify-between items-center">
                        <button onClick={(e) => handleAddTicket(e as any)} type="button" className="text-sm mt-3 mb-2 text-[#C30F66] flex justify-start items-center">
                            <span className="pr-1">Ajouter le ticket</span>
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 3C8.832 3 3 8.832 3 16C3 23.168 8.832 29 16 29C23.168 29 29 23.168 29 16C29 8.832 23.168 3 16 3ZM16 5C22.087 5 27 9.913 27 16C27 22.087 22.087 27 16 27C9.913 27 5 22.087 5 16C5 9.913 9.913 5 16 5ZM15 10V15H10V17H15V22H17V17H22V15H17V10H15Z" fill="#C30F66" fillOpacity="0.88" />
                            </svg>
                        </button>
                        {allTickets.length > 0 && (
                            <div className="flex gap-2">
                                <button type="button" className="text-[#C30F66]" onClick={() => setShowForm(false)}>Valider</button>
                                <button type="button" className="text-[#C30F66]" onClick={() => {
                                    clearAllTickets()
                                    sessionStorage.removeItem('totalPlace')
                                    setTotal(0)
                                    setPlace("")
                                }}>Annuler</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Ticket

