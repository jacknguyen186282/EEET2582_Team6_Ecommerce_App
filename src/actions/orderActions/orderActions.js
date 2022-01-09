import Axios from 'axios';
import { CART_EMPTY } from '../../constants/cartConstants';
import { refreshToken } from '../../lib/Auth';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_HISTORY_USER_REQUEST,
  ORDER_HISTORY_USER_SUCCESS,
  ORDER_HISTORY_USER_FAIL,
  ORDER_HISTORY_ADMIN_REQUEST,
  ORDER_HISTORY_ADMIN_SUCCESS,
  ORDER_HISTORY_ADMIN_FAIL,
//   ORDER_DETAILS_FAIL,
//   ORDER_DETAILS_REQUEST,
//   ORDER_DETAILS_SUCCESS,
//   ORDER_PAY_REQUEST,
//   ORDER_PAY_FAIL,
//   ORDER_PAY_SUCCESS,
//   ORDER_LIST_REQUEST,
//   ORDER_LIST_SUCCESS,
//   ORDER_LIST_FAIL,
//   ORDER_DELETE_REQUEST,
//   ORDER_DELETE_SUCCESS,
//   ORDER_DELETE_FAIL,
//   ORDER_DELIVER_REQUEST,
//   ORDER_DELIVER_SUCCESS,
//   ORDER_DELIVER_FAIL,
//   ORDER_SUMMARY_REQUEST,
//   ORDER_SUMMARY_SUCCESS,
} from '../../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    try {
      const { data } = await Axios.post('http://localhost:8084/order/addOrder', order, {
        headers: {
          Authorization: `Bearer ${accessToken} ${idToken}`,
        },
      });
      
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "Token expired") {
        refreshToken();
        dispatch(createOrder(order));
      } else {
        dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

export const listUserOrderHistory = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_HISTORY_USER_REQUEST });
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  try {
    const { data } = await Axios.get(`http://localhost:8084/order/getOrderByUser?page=0&user_id=${userInfo.email}`, {
      headers: {
        Authorization: `Bearer ${accessToken} ${idToken}`,
      },
    });    
    dispatch({ type: ORDER_HISTORY_USER_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Token expired") {
      refreshToken();
      dispatch(listUserOrderHistory());
    } else {
      dispatch({
        type: ORDER_HISTORY_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

