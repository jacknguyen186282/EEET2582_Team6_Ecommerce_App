import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserOrderHistory } from '../actions/orderActions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const OrderHistoryContainer = (props) => {
  const orderUserHistoryList = useSelector((state) => state.orderUserHistoryList);
  const { loading, error, orders } = orderUserHistoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUserOrderHistory());
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <table className="table">    
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME X QUANTITY</th>
              <th>Shipping Address</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orders.data ? orders.data.map((order) => (
                <tr key={order.id}>
                <td>{order.id.substring(0, 13)}</td>
                <td>{JSON.parse(order.product_list).map((product) => (
                    <div>
                        {product.name} &nbsp; x &nbsp; {product.quantity}
                    </div>
                ))}</td>
                <td>{order.shipping_address}</td>
                <td>{order.total.toFixed(2)}</td>
        
              </tr>
            )) : <p>No Order is found!</p> }
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
