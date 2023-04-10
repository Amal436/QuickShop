import {configureStore} from "@reduxjs/toolkit"
import productsReducer from '../reducers/productSlice';

export default configureStore({
    reducer:{
        product:productsReducer
    }
})