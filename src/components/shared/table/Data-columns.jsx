
import { ArrowUpDown, Delete, Edit, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox"
import DataTableColumnHeader from '@/components/shared/table/data-table-column-header'
import { Link } from 'react-router-dom';
import { AlertDial } from '@/components/shared/AlertDial';




export const getPurchaseColumns = ({ onEdit, onDelete }) => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
            </div>
        ),
    },
    {
        accessorKey: "firm",
        accessorFn: (row) => (row.firmId ? row.firmId.name : "N/A"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Firm" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "brand",
        accessorFn: (row) => (row.brandId ? row.brandId.name : "N/A"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "product",
        accessorFn: (row) => (row.productId ? row.productId.name : "N/A"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="font-medium">{formatted}</div>
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const purchase = row.original
            const firmId = purchase?._id ?? null

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onEdit(purchase)}
                        >
                            Edit
                            <DropdownMenuShortcut>
                                <Edit />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <AlertDial title="Delete Purchase?" onDelete={() => onDelete(purchase._id)}  >
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">Delete
                                <DropdownMenuShortcut >
                                    <Delete className="text-destructive" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </AlertDial>
                        <DropdownMenuLabel >Links</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`/stock/purchases/${purchase._id}`}>View purchase detail</Link>
                        </DropdownMenuItem>
                        {firmId
                            ? <DropdownMenuItem>
                                <Link to={`/stock/firms/${firmId}`}>View Firm</Link>
                            </DropdownMenuItem>
                            : <DropdownMenuItem className="opacity-5">No firm available</DropdownMenuItem>
                        }
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(purchase._id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },]





export const getSaleColumns = ({ onEdit, onDelete }) => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
            </div>
        ),
    },

    {
        accessorKey: "brand",
        accessorFn: (row) => (row.brandId ? row.brandId.name : "N/A"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "product",
        accessorFn: (row) => (row.productId ? row.productId.name : "N/A"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" isSorted={column.getIsSorted()} />
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit Price" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" isSorted={column.getIsSorted()} />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="font-medium">{formatted}</div>
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const sale = row.original


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(sale)}>Edit
                            <DropdownMenuShortcut>
                                <Edit />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <AlertDial title="Delete Sale?" onDelete={() => onDelete(sale._id)}>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">Delete
                                <DropdownMenuShortcut >
                                    <Delete className="text-destructive" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </AlertDial>
                        <DropdownMenuLabel >Links</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`/stock/sales/${sale._id}`}>View sale detail</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(sale._id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]