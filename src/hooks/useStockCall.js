import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchFail, fetchStart, fetchSuccess } from "../features/stockSlice"
import { selectAuthToken } from "../features/authSlice"
import { toast } from "sonner"



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

    const createStockData = async (name, createdInfo) => {
        console.log(name)
        try {

            await axios.post(`${BASE_URL}${name}/`, createdInfo, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })


            toast.success("Created Successfully!");
            await getStockData(name)
            return true;

        } catch (error) {
            dispatch(fetchFail(error));
            toast.error("Create Failed!", { description: error.message });
            return false;

        }

    }

    const updateStockData = async (name, id, updatedInfo) => {

        try {

            await axios.put(`${BASE_URL}${name}/${id}`, updatedInfo, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            toast.success("Updated Successfully!");
            await getStockData(name)
            return true

        } catch (error) {
            dispatch(fetchFail(error));
            toast.error("Update Failed!", { description: error.message });
            return false;
        }

    }

    const deleteStockData = async (name, id) => {
        console.log(name, id)
        try {
            await axios.delete(`${BASE_URL}${name}/${id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            toast.success("Deleted Successfully!");
            await getStockData(name);
        } catch (error) {
            console.log(error);
            dispatch(fetchFail(error));
            toast.error("Delete Failed!", { description: error.message });
        }
    };

    // paralel fetching

    const getStockResources = async (resources) => {

        try {
            await Promise.all(resources.map((resource) => getStockData(resource)));
        } catch (error) {
            console.log(error);
            toast.error("Data could not be loaded", { description: error.message });
        }
    };








    return { getStockData, getFirmById, createStockData, getStockResources, updateStockData, deleteStockData }

}

export default useStockCall