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

  export const productListAdminReducer = (state = { productsAdmin: [] }, action) => {
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

  export const orderAdminHistoryListReducer = (state = { orders: [] }, action) => {
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

  export const userListReducer = (state = { users: [] }, action) => {
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