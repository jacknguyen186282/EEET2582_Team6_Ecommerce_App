import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { cartReducer } from './reducers/cartReducers/cartReducers';
import { orderCreateReducer, orderUserHistoryListReducer } from './reducers/orderReducers/orderReducers';
import { productListReducer } from './reducers/productReducers/productListReducers';
import { productCategoryListReducer } from './reducers/productReducers/productCategoryListReducers';
import { productDetailReducer } from './reducers/productReducers/productDetailReducers';
import { userSignoutReducer } from './reducers/userReducers/signoutReducers';

import { orderAdminHistoryListReducer, userListReducer, 
        productListAdminReducer, productCreateAdminReducer,
        productDeleteAdminReducer, productEditAdminReducer} from './reducers/adminReducers/adminReducers';


const initialState = {
  
  // userInfo: localStorage.getItem('userInfo')
  //     ? JSON.parse(localStorage.getItem('userInfo'))
  //     : null,
  // userSignin: {
  //   userInfo: localStorage.getItem('userInfo')
  //     ? JSON.parse(localStorage.getItem('userInfo'))
  //     : null,
  // },
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
        shippingAddress: localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          : {},
        paymentMethod: 'COD',
      },
};


const reducer = combineReducers({
    cart: cartReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    orderCreate: orderCreateReducer,
    userSignout: userSignoutReducer,
    orderUserHistoryList: orderUserHistoryListReducer,
    productCategoryList: productCategoryListReducer,
    orderAdminHistoryList: orderAdminHistoryListReducer,
    userList: userListReducer,
    productListAdmin: productListAdminReducer,
    productCreateAdmin: productCreateAdminReducer,
    productDeleteAdmin: productDeleteAdminReducer,
    productEditAdmin: productEditAdminReducer,
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
