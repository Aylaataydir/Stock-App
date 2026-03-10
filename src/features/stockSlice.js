import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    error: null,
    loading: false,
    firms: [],
    firm:[],
    brands: [],
    categories: [],
    products: [],
    sales: [],
    purchases: [],

}

const stockSlice = createSlice({
    name:"stock",
    initialState,
    reducers: {
        fetchStart:(state) => {
            state.loading = true,
            state.error = null
        },
        fetchSuccess: (state, {payload: {name, data}}) => {
            state.loading = false;
            state[name] = data;

        },
        fetchFail:(state, {payload}) => {
            state.loading = false;
            state.error = payload;
        }
    } 

})


export const {fetchStart, fetchSuccess, fetchFail} = stockSlice.actions

export default stockSlice.reducer