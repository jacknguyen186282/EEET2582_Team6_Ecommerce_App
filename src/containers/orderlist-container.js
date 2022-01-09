import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAdminOrderHistory } from '../actions/adminActions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const OrderListContainer = (props) => {
  const orderAdminHistoryList = useSelector((state) => state.orderAdminHistoryList);
  const { loading, error, orders } = orderAdminHistoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAdminOrderHistory());
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
              <th>CUSTOMER NAME</th>
              <th>NAME X QUANTITY</th>
              <th>SHIPPING ADDRESS</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orders.data ? orders.data.map((order) => (
                <tr key={order.id}>
                <td>{order.id.substring(0, 13)}</td>
                <td>{order.userid}</td>
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
