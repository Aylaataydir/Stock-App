


import DataTable from '../components/shared/table/Data-table'
import { format } from "date-fns";


const Sales = () => {



    const { getStockData } = useStockCall();
    const error = useSelector(((state) => state.stock.error))
    const loading = useSelector((state) => state.stock.loading)
    const sales = useSelector((state) => state.stock.sales)

    useEffect(() => {
        getStockData("sales");
    }, []);



    return (
        <section>
            {error && <ErrorCard error={error} />}

            {loading ? (
                <TableSkeleton />
            ) : sales.length === 0 ? (
                <NotFoundCard />
            ) : (
                <div className="rounded-md border">
                    <div className="flex h-full flex-1 flex-col gap-8 p-8">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    sales
                                </h2>
                                <p className="text-muted-foreground">
                                    Track and manage all sale transactions by firm, brand,
                                    product, quantity, and amount.
                                </p>
                            </div>
                        </div>
                        <DataTable
                            data={sales}
                            columns={columns}
                            searchPlaceholder='Search firm, brand, product and quantity..'
                            searchableFields={[
                                "brandId.name",
                                "productId.name",
                                "quantity",
                                "amount",
                                "price",
                            ]}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Sales



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

import { Checkbox } from "@/components/ui/checkbox"
import DataTableColumnHeader from '../components/shared/table/data-table-column-header'
import useStockCall from '../hooks/useStockCall';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TableSkeleton } from '../components/shared/Skeletons';
import { NotFoundCard } from '../components/shared/InfoCard';
import { Link } from 'react-router-dom';


const columns = [

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
                        <DropdownMenuItem>Edit
                            <DropdownMenuShortcut>
                                <Edit />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">Delete
                            <DropdownMenuShortcut >
                                <Delete className="text-destructive" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
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