"use client"
import * as React from "react"
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import Link from "next/link"
import { Eye, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export type NotificationsTypes = {
    id: string
    createdAt: string
    title: string
    read: boolean
    message: string
    userId: string
    updatedAt: string,
    heure: string
}

export const columns: ColumnDef<NotificationsTypes>[] = [
    {
        accessorKey: "title",
        header: "Titre",
        cell: ({ row }) => (
            <div className="capitalize text-[11px] font-semibold ">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "message",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Message
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-[11px] ">{row.getValue("message")}</div>,
    },
    {
        accessorKey: "heure",
        header: ({ column }) => {
            return (
                <div className="flex justify-start items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Heure
                </div>
            )
        },
        // @ts-ignore
        cell: ({ row }) => <div className="text-right text-[11px]">{row.getValue("heure").split(':')[0]}h {row.getValue("heure").split(':')[1]}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const {toast} = useToast()
            const user = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!) : null
            const markAsRead = () => {
                // Mark notification as read
                console.log(`Marking notification as read: ${row.original.id}`)
            }

            // const [num, setNum] = React.useState(0)

            const deleteNotification = async () => {
                const res = await fetch(`/api/notifications?notificationId=${row.original.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user?.id!
                    })
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
                        title: "Notification supprimée",
                        description: "La notification a été supprimée avec succès",
                        variant: "default"
                    })
                    window.location.reload()
                }
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link onClick={() => sessionStorage.setItem('notifItemClicked', JSON.stringify(row.original))} href={`/notification/details?id=${row.original.id}`} className="flex gap-3 justify-start items-center text-sm">
                                <Eye size={20} color="#C30F66" />
                                <span>Voir</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div onClick={() => deleteNotification()} className="flex gap-3 justify-start items-center text-sm cursor-pointer">
                                <Trash size={20} color="#C30F66" />
                                <span className="text-[#C30F66]">Supprimer</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})


    const [allNotifications, setAllNotifications] = React.useState<NotificationsTypes[]>([])

    React.useEffect(() => {
        setAllAsRead()
        getNotification()
    }, [])

    const userId = typeof sessionStorage!== 'undefined' ? JSON.parse(sessionStorage.getItem('user')!)?.id : null

    const getNotification = async () => {
        if (userId) {
            const response = await fetch(`/api/notifications?userId=${userId}`)
            const data = await response.json()
            setAllNotifications(data.notifications)
            console.log(data.notifications)
        }
    }
    const setAllAsRead = async () => {
        await fetch(`/api/notifications`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId!
            })
        })
    }

    const table = useReactTable({
        data: allNotifications,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },

    })

    return (
        <div className="w-full select-none">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrer les notifications..."
                    value={(table.getColumn("message")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("message")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colonnes <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {allNotifications!.length > 0 && table?.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucune notification.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="flex-1 text-sm text-muted-foreground">
                    {allNotifications!.length > 0 && table.getFilteredSelectedRowModel().rows.length} sur{" "}
                    {allNotifications!.length > 0 && table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
                </div> */}
                {allNotifications!.length > 0 && (
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prec
                        </Button>
                        <span className="text-sm">
                            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Suiv
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
