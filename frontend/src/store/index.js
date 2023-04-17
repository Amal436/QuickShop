import { configureStore } from "@reduxjs/toolkit"
import productsReducer from '../reducers/productSlice';
import productDetailReducer from '../reducers/productDetailSlice';
import userReducer from '../reducers/userSlice';
import profileReducer from "../reducers/profileSlice";
import cartReducer from "../reducers/cartSlice";
import favouriteReducer from "../reducers/favouriteSlice";
import newOrderReducer from "../reducers/newOrderSlice";
import reviewReducer from "../reducers/reviewSlice";
import myOrderReducer from "../reducers/myOrderSlice";

export default configureStore({
    reducer: {
        products: productsReducer,
        product: productDetailReducer,
        user: userReducer,
        profile: profileReducer,
        cart: cartReducer,
        favourite: favouriteReducer,
        neworder: newOrderReducer,
        review: reviewReducer,
        myOrder: myOrderReducer,
    }
})