
import React, { useEffect } from 'react'
import { FirmCard } from '../components/FirmCard'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import { FirmCardsSkeleton } from '../components/shared/Skeleton'








const Firms = () => {

    const { getStockData } = useStockCall()
    const firms = useSelector((state) => state.stock.firms)
    const loading = useSelector((state) => state.stock.loading)


    useEffect(() => {
        getStockData("firms")

    }, [])

    return (
        <section>
            {loading
                ? <FirmCardsSkeleton />
                : <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
                    {firms?.map(firm => (
                        <FirmCard key={firm._id} firm={firm} />
                    ))}
                </div>
            }
        </section>
    )
}

export default Firms