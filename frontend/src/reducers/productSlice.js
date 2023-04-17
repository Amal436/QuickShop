import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  resultPerPage: 0,
  productsCount: 0,
  error: null
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProductRequest: (state, action) => {
      state.loading = true;
    },
    setAllProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.error = null;
    },
    setAllProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
    },
    clearErrors: (state, action) => {
      state.error = null;
    }
  }
})

export const { setAllProductRequest, setAllProductSuccess, setAllProductFail, clearErrors } = productSlice.actions;
export default productSlice.reducer;