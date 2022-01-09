import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

export const PaymentMethodContainer = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    window.location.href = '/shipping';
    // props.history.push('/shipping');
  }
  const submitHandler = (e) => {
    e.preventDefault();
    window.location.href = '/placeorder';
    // props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
          {/* TODOS */}
            <input
              type="radio"
              id="cod"
              value="Cod"
              name="paymentMethod"
              required
              checked
            ></input>
            <label htmlFor="cod">COD</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
