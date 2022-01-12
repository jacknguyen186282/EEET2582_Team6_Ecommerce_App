import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { editAdminProduct } from '../actions/adminActions/adminActions';
import { PRODUCT_EDIT_ADMIN_RESET } from '../constants/adminConstants';


export const EditProductAdminContainer = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

  const productEditAdmin = useSelector((state) => state.productEditAdmin);
  const { loading, success, error, product } = productEditAdmin;

  const [name, setName] = useState(params.get('name'));
  const [category, setCategory] = useState(params.get('category').substring(2));
  const [subcategory, setSubcategory] = useState(params.get('subcategory'));
  const [price, setPrice] = useState(params.get('price'));
  const [image_url, setImage_url] = useState(params.get('image_url'));
  const [stock, setStock] = useState(params.get('stock'));
  const [description, setDescription] = useState(params.get('description'));
  const [rating, setRating] = useState(params.get('rating'));
  const [isnew, setIsnew] = useState(params.get('isnew'));

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const completedProductInfo = {
        "id": params.get('id'),
        "name": name,
        "category": 'a-' + category,
        "subcategory": subcategory,
        "price": parseFloat(price) || 0.0000,
        "image_url": image_url,
        "stock": parseInt(stock) || 0,
        "description": description,
        "rating": rating,
        "isnew": JSON.parse(isnew),
    }
    console.log(completedProductInfo)
    dispatch(editAdminProduct(completedProductInfo));

  };

  useEffect(() => {
    if (success) {
        window.alert('Congrats. You Edited a Product sucessfully!');
        window.location.href = '/';
      dispatch({ type: PRODUCT_EDIT_ADMIN_RESET });
    }
  }, [dispatch, product, success]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Product &nbsp; {params.get('id')} &nbsp; Information</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="subcategory">Subcategory</label>
          <input
            type="text"
            id="subcategory"
            placeholder="Enter Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="image_url">Image Url</label>
          <input
            type="text"
            id="image_url"
            placeholder="Enter Image Url"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            id="stock"
            placeholder="Enter Stock Count"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            id="rating"
            placeholder="Enter Rating from 1 to 5 Stars"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="isnew">New Product?</label>
          <input
            type="text"
            id="isnew"
            placeholder="true/false value"
            value={isnew}
            onChange={(e) => setIsnew(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
