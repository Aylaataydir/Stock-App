import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { cleanAuth, selectAuthToken, updateUserInfo } from "../features/authSlice"



const BASE_URL = import.meta.env.VITE_API_URL

const useAuthCall = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(selectAuthToken)



  const signIn = async (credentials) => {

    try {

      const { data } = await axios.post(`${BASE_URL}auth/login`, credentials)
      console.log(data)

      dispatch(updateUserInfo(data))


      toast.success("Login successfull!", {
        description: `Welcome Back ${data.user.username}`,
      })

      navigate("/stock")

    } catch (error) {
      toast.error("Login failed!", {
        description: "Please check your credentials",
      })

    }

  }


  const signUp = async (credentials) => {

    try {

      const { data } = await axios.post(`${BASE_URL}users/`, credentials)

      dispatch(updateUserInfo(data))

      toast.success("Sign up successful!", {
        description: `Welcome ${data.data.username}`,
      })

      navigate("/stock")

    } catch (error) {
      toast.error("Sign up failed!", {
        description: "Please check your credentials",
      })

    }

  }

  const signOut = async () => {

    await new Promise((res) => setTimeout(res, 2000));

    try {

      const { data } = await axios.get(`${BASE_URL}auth/logout`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      })

      console.log("cikis yapildi")

      dispatch(cleanAuth())
      navigate("/")

    } catch (error) {
      toast.error("Login Faild", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }

  }


  return { signIn, signUp, signOut }
}


export default useAuthCall