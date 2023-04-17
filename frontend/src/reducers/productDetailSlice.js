import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
    loading: false,
    error: null
};

export const productDetailSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductDetailRequest: (state, action) => {
            state.loading = true;
        },
        setProductDetailSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        },
        setProductDetailFail: (state, action) => {
            state.loading = false;
            state.product = {};
            state.error = action.payload;
        },
        clearError: (state, action) => {
            state.error = null;
        }
    }
})

export const { setProductDetailRequest, setProductDetailSuccess, setProductDetailFail, clearError } = productDetailSlice.actions;
export default productDetailSlice.reducer;