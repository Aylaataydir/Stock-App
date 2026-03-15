


import DataTable from '../components/shared/table/Data-table'
import useStockCall from '../hooks/useStockCall';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TableSkeleton } from '../components/shared/Skeletons';
import { ErrorCard, NotFoundCard } from '../components/shared/InfoCard';
import { getSaleColumns } from '../components/shared/table/Data-columns';
import { useState } from 'react';
import SaleModal from '../components/SaleModal';


const Sales = () => {



    const { getStockData, deleteStockData } = useStockCall();
    const error = useSelector(((state) => state.stock.error))
    const loading = useSelector((state) => state.stock.loading)
    const sales = useSelector((state) => state.stock.sales)

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedSale, setSelectedSale] = useState(null)



    const handleModalChange = (isOpen) => {
        if (!isOpen) {
            setModalOpen(false)
            setSelectedSale(null)
        } else {
            setModalOpen(true)
        }
    }

    const onEdit = (sale) => {
        setSelectedSale({
            ...sale,
            brandId: sale?.brandId?._id,
            productId: sale?.productId?._id,
            quantity: sale?.quantity?.toString(),
            price: sale?.price?.toString(),
        })
        
        setModalOpen(true)
    }

  

    const onDelete = async(id) => {

     await deleteStockData("sales", id)

    }


    const columns = getSaleColumns({ onEdit: onEdit, onDelete: onDelete })


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
                            handleModalChange={handleModalChange}
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
            <SaleModal open={modalOpen} selectedSale={selectedSale} onOpenChange={handleModalChange} />
        </section>
    )
}

export default Sales



