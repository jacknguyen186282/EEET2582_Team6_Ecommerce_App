import Axios from 'axios';
import {
  USER_SIGNOUT,
} from '../../constants/userConstants';

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/';
  };