import axios from 'axios';
import { setProductDetailFail, setProductDetailRequest, setProductDetailSuccess } from '../reducers/productDetailSlice';

export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch(setProductDetailRequest());

        const url = `/api/v2/product/${id}`;
        const { data } = await axios.get(url);

        dispatch(setProductDetailSuccess(data));

    } catch (error) {
        dispatch(setProductDetailFail(error.response.data.message));
    }
}