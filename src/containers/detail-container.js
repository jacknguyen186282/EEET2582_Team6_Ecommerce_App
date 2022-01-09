import {DetailContainer as Detail} from "../components";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { detailProduct } from '../actions/productActions/detailProductActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { Button } from "../components/cover/styles/cover";

export const DetailContainer = (props) => {
  const dispatch = useDispatch();
  const productParams = useParams();
  const productId = productParams.id;
  const [qty, setQty] = useState(1);
  // JSON.stringify(productId);
  // const productId = props.match.params.id;
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(detailProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    window.location.href = `/cart/${productId}?qty=${qty}`;
    // window.location.href(`/cart/${productId}`);
    // this.props.history.push(`/cart/${productId}`);
  };

  return (
    <div>
      <Detail.TurnBack/>
      {/* <Link to="/">Back to homepage</Link> */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <Detail>
      <Detail.ImgContainer>
        <Detail.Image imageURL={product.data.image_url}/>
      </Detail.ImgContainer>

      <Detail.ContentContainer>
        <h1>{product.data.name}</h1>
        <Rating
        rating={product.data.rating}
        ></Rating> 
        <Detail.Field title={'Category'} value={product.data.category}/>
        <Detail.Field title={'Sub-category'} value={product.data.subcategory}/>
        <Detail.Field title={'Stock'} value={product.data.stock}/>
        <Detail.Field title={'Description'} value={product.data.description}/>
        <Detail.PriceContainer priceValue={'$' + product.data.price.toFixed(2)}/>
        <Detail.Paragraph content={product.data.description}/>
        <ul>
        <li>
            <div className="row">
              <div>Status</div>
              <div>
                {product.data.stock > 0 ? (
                  <span className="success">In Stock</span>
                ) : (
                  <span className="danger">Unavailable</span>
                )}
              </div>
            </div>
          </li>
          {product.data.stock > 0 && (
            <>
              <li>
                <div className="row">
                  <div>Qty</div>
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.data.stock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
        <Detail.Button onClick={addToCartHandler}/>
      </Detail.ContentContainer>
    </Detail>
    )}
    </div>
  );
}