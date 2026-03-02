import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser:null,
    token: null

}

export const authSlice = createSlice({
    name:auth,
    initialState,
    reducer: {
        updateUserInfo: (state, {payload}) => {
            console.log(payload)
        }
    }
})


export const {updateUserInfo} = authSlice.actions

export const selectedUser = (state) => state.auth.currentUser;
export const selectAuthToken = (state) => state.auth.token 

export default authSlice
