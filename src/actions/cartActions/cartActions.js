import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`http://localhost:8084/product/getProductById?id=${productId}`);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length > 100) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: 'Cannot add too much. Please contact us if you want to buy a lot. We will give discount!',
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.data.name,
        image: data.data.image_url,
        price: data.data.price,
        countInStock: data.data.stock,
        product: data.data.id,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

