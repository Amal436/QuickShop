import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    orders: [],
}

const myOrderSlice = createSlice({
    name: 'myOrder',
    initialState,
    reducers: {
        myOrdersRequest: (state, action) => {
            state.loading = true;
        },
        myOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        myOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.error = null;
        }
    }
})

export const { myOrdersRequest, myOrdersSuccess, myOrdersFail, clearErrors } = myOrderSlice.actions;
export default myOrderSlice.reducer;