import axios from "axios";
import { createOrderFail, createOrderRequest, createOrderSuccess } from "../reducers/newOrderSlice"


export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch(createOrderRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post("/api/v2/order/new", order, config);

        dispatch(createOrderSuccess(data));

    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}