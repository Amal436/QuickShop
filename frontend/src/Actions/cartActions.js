import axios from "axios";
import { addToCart, removeFromCart, saveShippingInformation } from "../reducers/cartSlice";

// add item to cart

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v2/product/${id}`);

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
    }))

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove items from cart

export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch(removeFromCart(id));

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO 
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch(saveShippingInformation(data));

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};