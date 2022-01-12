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
    PRODUCT_CREATE_ADMIN_RESET,
    PRODUCT_DELETE_ADMIN_REQUEST,
    PRODUCT_DELETE_ADMIN_SUCCESS,
    PRODUCT_DELETE_ADMIN_FAIL,
    PRODUCT_DELETE_ADMIN_RESET,
    PRODUCT_EDIT_ADMIN_REQUEST,
    PRODUCT_EDIT_ADMIN_SUCCESS,
    PRODUCT_EDIT_ADMIN_FAIL,
    PRODUCT_EDIT_ADMIN_RESET
  } from '../../constants/adminConstants';

  export const productEditAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_EDIT_ADMIN_REQUEST:
        return { loading: true };
      case PRODUCT_EDIT_ADMIN_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_EDIT_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_EDIT_ADMIN_RESET:
        return {};
      default:
        return state;
    }
  };

  export const productDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_ADMIN_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_ADMIN_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      // case PRODUCT_DELETE_ADMIN_RESET:
      //   return {};
      default:
        return state;
    }
  };

  export const productCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_ADMIN_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_ADMIN_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_ADMIN_RESET:
        return {};
      default:
        return state;
    }
  };

  export const productListAdminReducer = (state = { loading: true, productsAdmin: [] }, action) => {
    switch (action.type) {
      case PRODUCT_LIST_ADMIN_REQUEST:
        return { loading: true };
      case PRODUCT_LIST_ADMIN_SUCCESS:
        return { loading: false, productsAdmin: action.payload };
      case PRODUCT_LIST_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderAdminHistoryListReducer = (state = { loading: true, orders: [] }, action) => {
    switch (action.type) {
      case ORDER_HISTORY_ADMIN_REQUEST:
        return { loading: true };
      case ORDER_HISTORY_ADMIN_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_HISTORY_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userListReducer = (state = { loading: true,users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_ADMIN_REQUEST:
        return { loading: true };
      case USER_LIST_ADMIN_SUCCESS:
        return { loading: false, users: action.payload };
      case USER_LIST_ADMIN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };