import Axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../../constants/productConstants';

export const listProducts = ({
  pageNumber = '0',
  name = '',
  category = '',
  subcategory = '',
  order = '',
}) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      // console.log("Pagination Action")
      // console.log(pageNumber)
      // console.log(name)
      // console.log(category)
      // console.log(subcategory)
      // console.log(order)
      const { data } = await Axios.get(`http://localhost:8084/product/getProducts?page=${pageNumber}&category=a-${category}&name=${name}&subcategory=${subcategory}&sort=${order}&isnew`);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };