import {SearchContainer as Category} from "../components";
import { Product } from "../components"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions/listProductsActions';
import { listProductCategories } from '../actions/productActions/listProductCategoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export const SearchContainer = (props) => {
    const {
        name = 'all',
        category = 'all',
        subcategory = 'all',
        order = 'newest',
        pageNumber = 1,
      } = useParams();
      console.log("Search Params")
        console.log(pageNumber)
        console.log(name)
        console.log(category)
        console.log(subcategory)
        console.log(order)
    
      const dispatch = useDispatch();
      const productList = useSelector((state) => state.productList);
      const { loading, error, products } = productList;
      console.log(products)
    
      const productCategoryList = useSelector((state) => state.productCategoryList);
      const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
      } = productCategoryList;
      // useEffect(() => {
      //   dispatch(listProductCategories());
      // }, [dispatch]);
      useEffect(() => {
        console.log("Search Container")
        console.log(pageNumber)
        console.log(name)
        console.log(category)
        console.log(subcategory)
        console.log(order)
        dispatch(
          listProducts({
            pageNumber: pageNumber - 1,
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            subcategory: subcategory !== 'all' ? subcategory : '',
            order: order !== 'newest' ? order : '',
          })
          // listProducts({
          //   pageNumber,
          //   name: name !== 'all' ? name : '',
          //   category: category !== 'all' ? category : '',
          //   subcategory: subcategory !== 'all' ? subcategory : '',
          //   order,
          // })
        );
      }, [category, dispatch, subcategory, name, order, pageNumber]);

    const getFilterUrl = (filter) => {
      const filterPage = filter.page || pageNumber;
      const filterCategory = filter.category || category;
      const filterSubcategory = filter.subcategory || subcategory;
      const filterName = filter.name || name;
      const sortOrder = filter.order || order;
      return `/search/category/${filterCategory}/name/${filterName}/subcategory/${filterSubcategory}/order/${sortOrder}/pageNumber/${filterPage}`;
    };
  
  return (
    <div>
    <Category>
      {/* LocationLink (Homepage > Category > Jewelry) */}
      <Category.LocationLink>
        <p>Homepage</p>
        <span> &gt; </span>
        <p>Category</p>
        <span> &gt; </span>
        <p>{category}</p>
      </Category.LocationLink>

      <Category.MainContent>
        {/* Sidebar */}
        <Category.SideBar>

          {/* Sidebar Category Block */}
          <Category.Block>
            {/* Header */}
            <Category.SideBarHeader>
              <h2>Categories</h2>
            </Category.SideBarHeader>

            
            {/* Category Options */}
            {categories ? Object.keys(categories.data).map((c, index) => (
              <Category.Option key={index}>
                <Link to={`/search/category/${c.substring(2)}`}>
              <i class="fas fa-check-circle all-icon"></i>
              <label class="all-label">
                {c.substring(2)}
                </label>
                </Link>
                </Category.Option>
            )) : <p>No Category</p>}

          </Category.Block>

          {/* Sidebar Sub-category Block */}
          <Category.Block>
            {/* Header */}
            <Category.SideBarHeader>
              <h2>Sub Categories</h2>
            </Category.SideBarHeader>
            {/* Subcategory Options */}
            {(categories && category !== "all") ? categories.data[`a-${category}`].map((sc) => (
              <Category.Option>
              <Link to={`/search/category/${category}/subcategory/${sc}`}>
              <i class="fas fa-check-circle all-icon"></i>
              <label class="all-label">
                {sc}
                </label>
                </Link>
                </Category.Option>
            )) : <p>No Subcategory</p>}
          </Category.Block>

        


          {/* Sidebar Button */}
          <Category.ApplyButton><Link to="/">Back To Home &nbsp;<i class="far fa-arrow-alt-circle-right"></i></Link></Category.ApplyButton>

        </Category.SideBar>


        {/* Product list */}
        <Category.ProductList>

          <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <Category.FoundResult>
              <p>Items found: </p><span>{products.data.content.length}</span>
            </Category.FoundResult>
        )}
        <div>
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              window.location.href =(getFilterUrl({ order: e.target.value }));
              // this.props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="asc">Price: Low to High</option>
            <option value="des">Price: High to Low</option>
          </select>
        </div>
      </div>
           
          <Category.ProductRow>

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {/* {products.data.content.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )} */}
              <div className="row center">
                {products.data.content.map((product) => (
                  <Product.Card key={product.id}>
                  <Product.Discount>-10%</Product.Discount>
                  <Link to={`/product/${product.id}`}><Product.Image src={product.image_url}/></Link>
                  <Link to={`/product/${product.id}`}><Product.Title>{product.name}</Product.Title></Link>
                  <Rating rating={Math.ceil(product.rating)}></Rating>
                  <Product.Wrapper>
                    <Product.Price>{product.price.toFixed(2)}</Product.Price>
                  </Product.Wrapper>
                </Product.Card>
                ))}
              </div>
            </>
          )}
          
          {/* Single product card */}
          {/* <Product.Card>
            <Product.Discount></Product.Discount>
            <Product.Image src={ProductImage1}/>
            <Product.Title>lkzxncklgneriuerht</Product.Title>  
            <Product.Description>haha </Product.Description>
            <Product.Wrapper>
              <Product.Price>49.99 USD</Product.Price>
              <Product.Button>Add to Cart &nbsp;<i class="far fa-arrow-alt-circle-right"></i></Product.Button>
            </Product.Wrapper>
          </Product.Card> */}

          </Category.ProductRow>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {products.data.content.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
            <div className="row center pagination">
                {[...Array(products.data.total_page).keys()].map((x) => (
                  <Link
                    className={x === products.data.current_page ? 'active' : ''}
                    key={ x }
                    to={getFilterUrl({ page: x +1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
              </>
          )}
          
        </Category.ProductList>
      </Category.MainContent>
    </Category>
    </div>
  );
}