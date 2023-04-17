import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    order: {},
    error: null,

}

export const newOrderSlice = createSlice({
    name: 'neworder',
    initialState,

    reducers: {
        createOrderRequest: (state, action) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
        },
        createOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.error = null;
        }
    }
})

export const { createOrderRequest, createOrderSuccess, createOrderFail, clearErrors } = newOrderSlice.actions;
export default newOrderSlice.reducer;