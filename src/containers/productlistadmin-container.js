import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductAdmin } from '../actions/adminActions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const ProductListAdminContainer = (props) => {
  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { loading, error, productsAdmin } = productListAdmin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductAdmin());
  }, [dispatch]);
  return (
    <div>
      <h1>Product List</h1>
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
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>SUBCATEGORY</th>
              <th>ISNEW</th>
              <th>IMAGE_URL</th>
              <th>STOCK</th>
              <th>DESCRIPTION</th>
              <th>RATING</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {productsAdmin.data ? productsAdmin.data.content.map((productAdmin) => (
                <tr key={productAdmin.id}>
                <td>{productAdmin.id}</td>
                <td>{productAdmin.name}</td>
                <td>{productAdmin.category}</td>
                <td>{productAdmin.subcategory}</td>
                <td>{productAdmin.isnew}</td>
                <td>{productAdmin.image_url}</td>
                <td>{productAdmin.stock}</td>
                <td>{productAdmin.description}</td>
                <td>{productAdmin.rating}</td>
                <td>{productAdmin.price.toFixed(2)}</td>
        
              </tr>
            )) : <p>No Order is found!</p> }
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
