import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchFail, fetchStart, fetchSuccess } from "../features/stockSlice"
import { selectAuthToken } from "../features/authSlice"



const BASE_URL = import.meta.env.VITE_API_URL

const useStockCall = () => {

    const dispatch = useDispatch()
    const token = useSelector(selectAuthToken)


    const getStockData = async (name) => {

        try {

            dispatch(fetchStart())
            const { data } = await axios.get(`${BASE_URL}${name}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            console.log(data.data)
            dispatch(fetchSuccess({name, data:data.data}))

        } catch (error) {
            dispatch(fetchFail(error))

        }
    }
    
    return { getStockData }

}

export default useStockCall