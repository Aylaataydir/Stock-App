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
            dispatch(fetchSuccess({ name, data: data.data }))

        } catch (error) {
            dispatch(fetchFail(error));
            toast.error("Data could not be loaded", { description: error.message });

        }
    }


    const getFirmById = async (id) => {

        try {
            dispatch(fetchStart())
            const { data } = await axios.get(`${BASE_URL}firms/${id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            console.log(data.data)
            dispatch(fetchSuccess({ name: "firm", data: data.data }))

        } catch (error) {
            dispatch(fetchFail(error));
        }

    }

    const createStockData = async ({ name, createdInfo }) => {

        try {

            await axios.put(`${BASE_URL}${name}`, createdInfo, {
                header: {
                    Authorization: `Token ${token}`,
                }
            })

            toast.success("Created Successfully!");
            await getStockData(url)
            return true;

        } catch (error) {
            dispatch(fetchFail(error));
            toast.error("Create Failed!", { description: error.message });
            return false;

        }

    }

    const updateStockData = async ({name, id, updatedInfo}) => {

        try {

            await axios.put(`${BASE_URL}${url}/${id}`, updatedInfo, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })

        } catch (error) {

        }

    }



    return { getStockData, getFirmById, createStockData }

}

export default useStockCall