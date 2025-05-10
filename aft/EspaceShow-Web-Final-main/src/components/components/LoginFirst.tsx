import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation";


export default function LoginFirst({ route }: {route:string}) {
    const {data: session} = useSession()
    const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
    const router = useRouter()
    const send = () => {
        localStorage.setItem("route", route)
        router.push('/sign-in')
    }
    return (
        <>
            {!session?.user || !user && (
                <div className="mt-3 min-h-[90vh] flex justify-center items-center">
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-full w-full md:h-[400px] md:w-[700px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]"/>
                            <Skeleton className="h-4 w-[200px]"/>
                        </div>
                    </div>
                </div>
            )}
            <Dialog open={!user} onOpenChange={() => router.push('/')}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Vous n'êtes pas connecté(e)</DialogTitle>
                        <DialogDescription>
                            Veuillez vous connecter en premier lieu à la plateforme
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="justify-end">
                        <button className="bg-[#C30F66] p-2 rounded-lg text-right text-white" onClick={() => send()} >
                            Connexion
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
