


import DataTable from '../components/shared/table/Data-table'
import { useState, useEffect } from "react";
import useStockCall from '../hooks/useStockCall';
import { useSelector } from 'react-redux';
import { TableSkeleton } from '../components/shared/Skeletons';
import { ErrorCard, NotFoundCard } from '../components/shared/InfoCard';
import PurchaseModal from '../components/PurchaseModal';
import { getPurchaseColumns } from '../components/shared/table/Data-columns';



const Purchases = () => {

    const { getStockData, deleteStockData } = useStockCall();
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

    const onDelete = async (purchaseId) => {
        await deleteStockData("purchases", purchaseId)
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


    const columns = getPurchaseColumns({ onEdit: onEdit, onDelete: onDelete })

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







