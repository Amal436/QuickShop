import axios from "axios";
import { myOrdersFail, myOrdersRequest, myOrdersSuccess } from "../reducers/myOrderSlice";

export const myOrders = () => async (dispatch) => {
    try {
        dispatch(myOrdersRequest());

        const { data } = await axios.get("/api/v2/orders/me");

        dispatch(myOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message));
    }
};