import Axios from 'axios';
import {
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
} from '../../constants/productConstants';

export const listProductCategories = () => async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get('http://localhost:8084/product/getCategoryWithExtras');
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
  };