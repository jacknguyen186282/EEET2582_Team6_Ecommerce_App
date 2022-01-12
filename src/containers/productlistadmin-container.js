import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductAdmin, deleteAdminProduct } from '../actions/adminActions/adminActions';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {EditProductAdminContainer} from './editproductadmin-container';
import {
  PRODUCT_DELETE_ADMIN_RESET,
} from '../constants/adminConstants';

export const ProductListAdminContainer = (props) => {
  const {
    pageNumber = 1,
  } = useParams();

  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { loading, error, productsAdmin } = productListAdmin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProductAdmin({
      pageNumber: pageNumber - 1,
    }));
  }, [dispatch, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    return `/productlist/pageNumber/${filterPage}`;
  };

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDeleteAdmin;
  useEffect(() => {
    dispatch(
      listProductAdmin({
      pageNumber: pageNumber - 1,
    }));
    
  }, [dispatch, pageNumber]);

  // useEffect(() => {
  //   if (successDelete) {
  //     dispatch({ type: PRODUCT_DELETE_ADMIN_RESET });
  //   }
    
  // }, [dispatch,successDelete]);

  const deleteHandler = (product, e) => {
    if (window.confirm('Are you sure to delete?')) {
      e.target.parentElement.parentElement.className ='hide'
      dispatch(deleteAdminProduct(product.id));
    }
  };
  return (
    <div>
      <div className='row'>
        <h1>Product List</h1>
          <button type="button" className="primary">
            <Link to={'/productlist/addproduct'}>Create Product</Link>
          </button>
      </div>
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
              <th>DATE CREATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {productsAdmin.data ? productsAdmin.data.content.map((product) => { 
              let timestamp = parseInt(product.id.substring(0, 13))

              return (
                <tr key={product.id}>
                <td className='active'><a><Link to={`/product/${product.id}`}>{product.id}</Link></a></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.subcategory}</td>
                <td>{product.isnew}</td>
                <td>{product.image_url}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td>{product.rating.toFixed(2)}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  {new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                    >
                      <Link to={`/productlist/edit?id=${product.id}&name=${product.name}&category=${product.category}&price=${product.price}&subcategory=${product.subcategory}&stock=${product.stock}&description=${product.description}&rating=${product.rating}&isnew=${product.isnew}&image_url=${product.image_url}`}>Edit</Link>
                      {/* <Link to={`/productlist/edit/id/${product.id}/name/${product.name}/category/${product.category}/price/${product.price}/subcategory/${product.subcategory}/image_url/${product.image_url}/stock/${product.stock}/description/${product.description}/rating/${product.rating}/isnew/${product.isnew}`}>Edit</Link> */}
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={(e) => deleteHandler(product, e)}
                    >
                      Delete
                    </button>
                  </td>
        
              </tr>
            )}) : <p>No Product is found!</p> }
          </tbody>
        </table>
        </>
      )}
      {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {productsAdmin.data.content.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
            <div className="row center pagination">
                {[...Array(productsAdmin.data.total_page).keys()].map((x) => (
                  <Link
                    className={x === productsAdmin.data.current_page ? 'active' : ''}
                    key={ x }
                    to={getFilterUrl({ page: x +1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
              </>
          )}
    </div>
  );
}
