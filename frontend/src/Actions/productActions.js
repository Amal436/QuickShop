import axios from 'axios';
import { setAllProductFail, setAllProductRequest, setAllProductSuccess } from '../reducers/productSlice';

export const getproduct = (keyword = "", currentPage = 1, category) => async (dispatch) => {
  try {
    dispatch(setAllProductRequest());   // dispatch the request action first

    const link = `/api/v2/products`;
    const {data} = await axios.get(link);

    dispatch(setAllProductSuccess(data))  // dispatch the success action with the API data as the payload

  } catch (error) {
     dispatch(setAllProductFail(error))
  }
};
