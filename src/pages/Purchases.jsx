


import DataTable from '../components/shared/table/Data-table'
import { format } from "date-fns";
import { useState, useEffect } from "react";



const Purchases = () => {

    const { getStockData } = useStockCall();
    const error = useSelector(((state) => state.stock.error))
    const loading = useSelector((state) => state.stock.loading)
    const purchases = useSelector((state) => state.stock.purchases)


    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPurchase, setSelectedPurchase] = useState(null)



    const onEdit = (purchase) => {
        setSelectedPurchase({
            ...purchase,
            firmId: purchase?.firmId?._id,
            brandId: purchase?.brandId?._id,
            productId: purchase?.productId?._id,
            quantity: purchase?.quantity?.toString(),
            price: purchase?.price?.toString(),
        })

        setModalOpen(true);

    }

    const handleModalChange = (isOpen) => {
        if (!isOpen) {
            setModalOpen(false)
            setSelectedPurchase(null)
        } else {
            setModalOpen(true)
        }
    }



    useEffect(() => {
        getStockData("purchases");
    }, []);


    const columns = getColumns({onEdit:onEdit})

    return (
        <section>
            {error && <ErrorCard error={error} />}

            {loading ? (
                <TableSkeleton />
            ) : purchases.length === 0 ? (
                <NotFoundCard />
            ) : (
                <div className="rounded-md border">
                    <div className="flex h-full flex-1 flex-col gap-8 p-8">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Purchases
                                </h2>
                                <p className="text-muted-foreground">
                                    Track and manage all purchase transactions by firm, brand,
                                    product, quantity, and amount.
                                </p>
                            </div>
                        </div>
                        <DataTable
                            handleModalChange={handleModalChange}
                            data={purchases}
                            columns={columns}
                            searchPlaceholder='Search firm, brand, product and quantity..'
                            searchableFields={[
                                "firmId.name",
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
            <PurchaseModal open={modalOpen} onOpenChange={handleModalChange} selectedPurchase={selectedPurchase} />
        </section>
    )
}

export default Purchases



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

import { TableSkeleton } from '../components/shared/Skeletons';
import { ErrorCard, NotFoundCard } from '../components/shared/InfoCard';
import { Link } from 'react-router-dom';
import PurchaseModal from '../components/PurchaseModal';



const getColumns = ({ onEdit }) => [
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
                        <DropdownMenuItem variant="destructive">Delete
                            <DropdownMenuShortcut >
                                <Delete className="text-destructive" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
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