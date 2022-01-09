import Axios from 'axios';
import {
  USER_SIGNOUT,
} from '../../constants/userConstants';

export const userSignoutReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_SIGNOUT:
        return {};
      default:
        return state;
    }
};