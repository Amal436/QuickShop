import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: [],
    loading: false,
    error: null
  };

  export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
      setAllProductRequest:(state,action)=>{
        state.loading = true;
      },
      setAllProductSuccess:(state,action)=>{
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      },
      setAllProductFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      },
      clearErrors:(state,action)=>{
        state.error = null;
      }
    }
  })

  export const {setAllProductRequest,setAllProductSuccess,setAllProductFail,clearErrors} = productSlice.actions;
  export default productSlice.reducer;