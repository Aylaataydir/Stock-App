
import React, { useEffect, useState } from 'react'
import { FirmCard } from '../components/FirmCard'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import { FirmCardsSkeleton } from '../components/shared/Skeletons'
import { ErrorCard, NotFoundCard } from '../components/shared/InfoCard'
import FirmModal from '@/components/FirmModal'



const Firms = () => {

    const { getStockData } = useStockCall()
    const firms = useSelector((state) => state.stock.firms)
    const loading = useSelector((state) => state.stock.loading)
    const error = useSelector((state) => state.stock.error)

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedFirm, setSelectedFirm] = useState(null)



    const onEdit = (firm) => {
        setModalOpen(true);
        setSelectedFirm(firm)
    }

    const handleModalChange = (isOpen) => {
        if (!isOpen) {
            setModalOpen(false)
            setSelectedFirm(null)
        }else{
            setModalOpen(true)
        }

    }


    useEffect(() => {
        getStockData("firms")

    }, [])

    return (
        <section className='mt-5'>
            <FirmModal modalOpen={modalOpen} handleModalChange={handleModalChange} selectedFirm={selectedFirm} />

            {error && <ErrorCard error={error} />}

            {loading
                ? <FirmCardsSkeleton />
                : firms.length === 0
                    ? <NotFoundCard />
                    :
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8  lg:gap-4 space-y-5'>
                        {firms?.map(firm => (
                            <FirmCard key={firm._id} firm={firm} onEdit={onEdit} />
                        ))}
                    </div>
            }
        </section>
    )
}

export default Firms