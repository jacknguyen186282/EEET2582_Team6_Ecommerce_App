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
              <th>CREATED DATE</th>
            </tr>
          </thead>
          <tbody>
            {orders.data ? orders.data.content.map((order) => { 
              let timestamp = parseInt(order.id.substring(0, 13))

              return (
                <tr key={order.id}>
                <td>{order.id.substring(0, 13)}</td>
                <td>{JSON.parse(order.product_list).map((product) => (
                    <div>
                        {product.name} &nbsp; x &nbsp; {product.quantity}
                    </div>
                ))}</td>
                <td>{order.shipping_address}</td>
                <td>{order.total.toFixed(2)}</td>
                <td>{new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')}</td>
        
              </tr>
            )}) : <p>No Order is found!</p> }
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
