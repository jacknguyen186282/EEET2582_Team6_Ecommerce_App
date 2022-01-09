import Axios from 'axios';
import { refreshToken } from '../../lib/Auth';
import {
  ORDER_HISTORY_ADMIN_REQUEST,
  ORDER_HISTORY_ADMIN_SUCCESS,
  ORDER_HISTORY_ADMIN_FAIL,
  USER_LIST_ADMIN_REQUEST,
  USER_LIST_ADMIN_SUCCESS,
  USER_LIST_ADMIN_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
} from '../../constants/adminConstants';

export const listProductAdmin = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  try {
    const { data } = await Axios.get(`http://localhost:8084/product/getProducts?page=0&category=&name=&isnew&sort=&subcategory=`, {
      headers: {
        Authorization: `Bearer ${accessToken} ${idToken}`,
      },
    });    
    dispatch({ type: PRODUCT_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Token expired") {
      refreshToken();
      dispatch(listUser());
    } else {
      dispatch({
        type: PRODUCT_LIST_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const listAdminOrderHistory = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_ADMIN_REQUEST });
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const { data } = await Axios.get(`http://localhost:8084/order/getOrders?page=0`, {
        headers: {
          Authorization: `Bearer ${accessToken} ${idToken}`,
        },
      });    
      dispatch({ type: ORDER_HISTORY_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "Token expired") {
        refreshToken();
        dispatch(listAdminOrderHistory());
      } else {
        dispatch({
          type: ORDER_HISTORY_ADMIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

  export const listUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_ADMIN_REQUEST });
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const { data } = await Axios.get(`http://localhost:8084/user/getUsers?page=0`, {
        headers: {
          Authorization: `Bearer ${accessToken} ${idToken}`,
        },
      });    
      dispatch({ type: USER_LIST_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "Token expired") {
        refreshToken();
        dispatch(listUser());
      } else {
        dispatch({
          type: USER_LIST_ADMIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };