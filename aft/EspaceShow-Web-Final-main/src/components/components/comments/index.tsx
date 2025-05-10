import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { colors } from '@/utils/constants'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { UpdateIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Comments = (comment: any) => {
    const { data: session } = useSession()
    const router = useRouter()
    const { toast } = useToast()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const [updateValue, setUpdateValue] = useState("")
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [deleteComment, setDeleteComment] = useState(false)

    // handleUpdateComment (id)
    const handleUpdateComment = async (comment:any) => {
        const response = await fetch(`/api/events/comments`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentId: comment.id,
                comments: updateValue,
                userId: user?.id,
                eventId: comment.eventId,
            })
        })
        const data = await response.json()
        if (!data.success) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue",
                variant: "destructive"
            })
            return
        } else {
            setShowUpdateModal(false)
            toast({
                title: " ",
                description: "Commentaire mis à jour avec succès",
                variant: "default"
            })
            window.location.reload()
        }
    }

    // handleDeleteComment (id)
    const handleDeleteComment = async (id: string) => {
        const response = await fetch(`/api/events/comments`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentId: id
            })
        })
        const data = await response.json()
        if (!data.success) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue",
                variant: "destructive"
            })
            return
        } else {
            setDeleteComment(false)
            toast({
                title: " ",
                description: "Commentaire supprimé avec succès",
                variant: "default"
            })
            window.location.reload()
        }
    }

    return (
        <div className="py-2 select-none text-sm bg-slate-50 my-2 p-2">
            <div className="flex gap-3">
                <Image height={0} alt="user" width={100} src={`${comment.profile}`} className="w-[30px] h-[30px] border rounded-full" quality={70} loading="lazy" />
                <p style={{ color: '#495057', fontSize: '11px', opacity: '.9' }}>{comment.comments}</p>
            </div>
            <div className="flex justify-between items-center">
                {user && comment.userId === user.id && (
                    <div className="flex justify-start items-center gap-5">
                        <UpdateIcon onClick={() => setShowUpdateModal(true)} className="cursor-pointer text-blue-500" fontSize={11} />
                        <Trash onClick={() => setDeleteComment(true)} className="cursor-pointer text-red-500" size={16} />
                    </div>
                )}
                <div></div>
                <div className="flex justify-end items-center mt-2">
                    <p className="font-semibold italic" style={{ color: '#495057', fontSize: '11px', opacity: '.7' }}>{comment.author}</p>
                    <p className="font-semibold italic" style={{ color: '#495057', fontSize: '9px', opacity: '.7' }}>,
                        ce {comment.createdAt.split('T')[0].split('-')[2]}/{comment.createdAt.split('T')[0].split('-')[1]}/{comment.createdAt.split('T')[0].split('-')[0]}</p>
                </div>
            </div>
            {/* Update comment part */}
            <Dialog open={showUpdateModal} onOpenChange={() => { setShowUpdateModal(false) }}>
                {session?.user && user && (
                    <DialogContent className="sm:max-w-full border p-2 my-2">
                        <DialogHeader>
                        </DialogHeader>
                        <div className="w-full -ml-4 items-center my-2">
                            <textarea id="comments" value={ updateValue } defaultValue={comment.comments} onChange={(e) => setUpdateValue(e.target.value)} autoFocus rows={5} className="p-2 w-[99%] outline-none h-[170px] md:h-[100px] col-span-3 ml-5 resize-none border border-slate-200 rounded-lg text-black"></textarea>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => handleUpdateComment(comment)} className={`outline-none bg-[${colors.primary}] text-[11px] hover:bg-[${colors.primary}]`} type="button">Modifier</Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
            {/* Update comment part */}

            {/* Delete comment part */}
            <Dialog open={deleteComment} onOpenChange={() => { setDeleteComment(false) }}>
                {session?.user && user && (
                    <DialogContent className="sm:max-w-full text-sm  text-red-500 border border-red-500 p-2 my-2">
                        <DialogHeader>
                            <DialogTitle>Confirmez la suppression</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <div className="flex justify-between items-center text-sm text-white gap-3">
                                <button onClick={() => setDeleteComment(false)} className={`p-1 outline-none text-[11px] rounded-sm bg-[${colors.primary}] hover:bg-[${colors.primary}]`} type="button">Annuler</button>
                                <button onClick={() => handleDeleteComment(comment.id)} className={`bg-[${colors.primary}] outline-none text-[11px] p-1 rounded-sm hover:bg-[${colors.primary}]`} type="button">Confirmer</button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
            {/* Delete comment part */}


        </div>
    )
}

export default Comments
