import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Logout from '@/components/ui/logout'
import { colors } from "@/utils/constants"
import { Bell, ChevronDownIcon, Lock, Settings, UserCheck } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"


export function UserButton() {
    const user = JSON.parse(sessionStorage.getItem('user')!)
    const [role, setRole] = useState<string>(sessionStorage.getItem('role')! || 'organisateur')

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer justify-start gap-1 ml-3 items-center">
                    <Image loading="lazy" src={`${user.profile}`} alt="user" width={100} height={100} className="rounded-full mr-1 cursor-pointer" style={{ width: '50px', height: '50px', border: `3px solid ${colors.primary}` }} />
                    <p className="hidden md:flex justify-start items-center font-bold">
                        <span>@{user.prenom}</span>
                        <ChevronDownIcon/>
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-[15px] mr-3">
                <DropdownMenuLabel>{user.prenom} {user.nom}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link scroll={false} className="flex justify-between items-center w-full" href="/account/settings/profile">
                            Information du profile
                            <DropdownMenuShortcut><UserCheck size={15} className="text-slate-500" /></DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link scroll={false} className="flex justify-between items-center w-full" href="/account/settings/password">
                            Mot de passe
                            <DropdownMenuShortcut><Lock size={15} className="text-slate-500"/></DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link scroll={false} className="flex justify-between items-center w-full" href="/account/settings">
                            Paramètres du compte
                            <DropdownMenuShortcut><Settings size={15} className="text-slate-500" /></DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link scroll={false} className="flex justify-between items-center w-full" href="/notification">
                            Notifications ({sessionStorage.getItem('notif')})
                            <DropdownMenuShortcut><Bell size={15} className="text-slate-500"/></DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <p className="flex justify-between items-center w-full" onClick={() => {
                        if (sessionStorage.getItem('role') === "utilisateur") {
                            sessionStorage.setItem('role', "organisateur")
                            setRole("utilisateur")
                        } else {
                            sessionStorage.setItem('role', "utilisateur")
                            setRole("organisateur")
                        }
                        window.location.reload()
                    }}>Basculer en {role}</p>
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Logout />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
