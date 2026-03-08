
import React, { useEffect } from 'react'
import { FirmCard } from '../components/shared/FirmCard'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'








const Firms = () => {

    const { getStockData } = useStockCall()
    const firms = useSelector((state) => state.stock.firms)


    useEffect(() => {
        getStockData("firms")

    }, [])

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
            {firms?.map(firm => (
                <FirmCard key={firm._id} firm={firm} />
            ))}
        </div>
    )
}

export default Firms