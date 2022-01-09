import Axios from 'axios';
import {
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../../constants/productConstants';

export const detailProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
    try {
      const { data } = await Axios.get(`http://localhost:8084/product/getProductById?id=${productId}`);
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };