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
  PRODUCT_CREATE_ADMIN_REQUEST,
  PRODUCT_CREATE_ADMIN_SUCCESS,
  PRODUCT_CREATE_ADMIN_FAIL,
  PRODUCT_DELETE_ADMIN_REQUEST,
  PRODUCT_DELETE_ADMIN_SUCCESS,
  PRODUCT_DELETE_ADMIN_FAIL,
  PRODUCT_EDIT_ADMIN_REQUEST,
  PRODUCT_EDIT_ADMIN_SUCCESS,
  PRODUCT_EDIT_ADMIN_FAIL,
  PRODUCT_EDIT_ADMIN_RESET
} from '../../constants/adminConstants';

export const editAdminProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_EDIT_ADMIN_REQUEST, payload: product });
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");
  try {
    const { data } = await Axios.post('http://localhost:8084/product/updateProduct', product, {
      headers: {
        Authorization: `Bearer ${accessToken} ${idToken}`,
      },
    });
    
    dispatch({ type: PRODUCT_EDIT_ADMIN_SUCCESS, payload: data.product });
    // dispatch({ type: PRODUCT_EDIT_ADMIN_EMPTY });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Token expired") {
      refreshToken();
      dispatch(editAdminProduct(product));
    } else {
      dispatch({
        type: PRODUCT_EDIT_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};
export const deleteAdminProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_ADMIN_REQUEST, payload: productId });
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");
  try {
    const { data } = Axios.delete(`http://localhost:8084/product/deleteProduct?id=${productId}`, {
      headers: { Authorization: `Bearer ${accessToken} ${idToken}` },
    });
    dispatch({ type: PRODUCT_DELETE_ADMIN_SUCCESS });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Token expired") {
      refreshToken();
      dispatch(deleteAdminProduct(productId));
    } else {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_ADMIN_FAIL, payload: message });
    }
  }
};

export const createAdminProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_ADMIN_REQUEST, payload: product });
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");
  try {
    const { data } = await Axios.post('http://localhost:8084/product/addProduct', product, {
      headers: {
        Authorization: `Bearer ${accessToken} ${idToken}`,
      },
    });
    
    dispatch({ type: PRODUCT_CREATE_ADMIN_SUCCESS, payload: data.product });
    // dispatch({ type: PRODUCT_CREATE_ADMIN_EMPTY });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Token expired") {
      refreshToken();
      dispatch(createAdminProduct(product));
    } else {
      dispatch({
        type: PRODUCT_CREATE_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const listProductAdmin = ({
  pageNumber = '0',
}) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });
  try {
    const { data } = await Axios.get(`http://localhost:8084/product/getProducts?page=${pageNumber}&category=&name=&subcategory=&sort=&isnew`);    
    dispatch({ type: PRODUCT_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ADMIN_FAIL, payload: error.message });
  }
};

export const listAdminOrderHistory = ({
  pageNumber = '0',
}) => async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_ADMIN_REQUEST });
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const { data } = await Axios.get(`http://localhost:8084/order/getOrders?page=${pageNumber}`, {
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

  export const listUser = ({
    pageNumber = '0',
  }) => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_ADMIN_REQUEST });
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const { data } = await Axios.get(`http://localhost:8084/user/getUsers?page=${pageNumber}`, {
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