import axios from 'axios';
import { setAllProductFail, setAllProductRequest, setAllProductSuccess } from '../reducers/productSlice';
import { newReviewFail, newReviewRequest, newReviewSuccess } from '../reducers/reviewSlice';

export const getproduct = (keyword = "", currentPage = 1, category) => async (dispatch) => {
  try {
    dispatch(setAllProductRequest());   // dispatch the request action first

    let link = `/api/v2/products?keyword=${keyword}&page=${currentPage}`;

    if (category) {
      link = `/api/v2/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
    }
    if (category === 'all') {
      link = `/api/v2/products?page=${currentPage}`
    }

    const { data } = await axios.get(link);

    dispatch(setAllProductSuccess(data))  // dispatch the success action with the API data as the payload

  } catch (error) {
    dispatch(setAllProductFail(error.response.data.message))
  }
};


// new review actions.
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(newReviewRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v2/product/review`, reviewData, config);

    dispatch(newReviewSuccess(data.success));
  } catch (error) {
    dispatch(newReviewFail(error.response.data.message));
  }
};