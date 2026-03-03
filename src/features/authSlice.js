import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    token: null

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUserInfo: (state, { payload }) => {
            if (payload.user) {
                const { email, username, isAdmin, firstName, lastName } = payload.user
                state.currentUser = { email, username, isAdmin, firstName, lastName }
            } else {
                const { email, username, isAdmin, firstName, lastName } = payload.data;
                state.currentUser = { email, username, isAdmin, firstName, lastName };
            }
        }
    }
})


export const { updateUserInfo } = authSlice.actions

export const selectedUser = (state) => state.auth.currentUser;
export const selectAuthToken = (state) => state.auth.token

export default authSlice.reducer
