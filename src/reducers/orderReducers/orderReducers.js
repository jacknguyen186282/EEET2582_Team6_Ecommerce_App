import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_HISTORY_USER_REQUEST,
    ORDER_HISTORY_USER_SUCCESS,
    ORDER_HISTORY_USER_FAIL,
    ORDER_HISTORY_ADMIN_REQUEST,
    ORDER_HISTORY_ADMIN_SUCCESS,
    ORDER_HISTORY_ADMIN_FAIL,
    // ORDER_DETAILS_FAIL,
    // ORDER_DETAILS_REQUEST,
    // ORDER_DETAILS_SUCCESS,
    // ORDER_PAY_FAIL,
    // ORDER_PAY_REQUEST,
    // ORDER_PAY_RESET,
    // ORDER_PAY_SUCCESS,
    // ORDER_LIST_REQUEST,
    // ORDER_LIST_SUCCESS,
    // ORDER_LIST_FAIL,
    // ORDER_DELETE_REQUEST,
    // ORDER_DELETE_SUCCESS,
    // ORDER_DELETE_FAIL,
    // ORDER_DELETE_RESET,
    // ORDER_DELIVER_REQUEST,
    // ORDER_DELIVER_SUCCESS,
    // ORDER_DELIVER_FAIL,
    // ORDER_DELIVER_RESET,
    // ORDER_SUMMARY_REQUEST,
    // ORDER_SUMMARY_SUCCESS,
    // ORDER_SUMMARY_FAIL,
  } from '../../constants/orderConstants';
  
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUserHistoryListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_USER_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_HISTORY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

