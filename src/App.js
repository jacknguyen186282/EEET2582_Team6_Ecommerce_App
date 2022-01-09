import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer} from './containers/header';
import { FooterContainer} from './containers/footer';
import {Route, Switch} from "react-router"
import Home from './pages/home';
import Detail from './pages/detail';
import Cart from './pages/cart';
import ShippingAddress from './pages/shippingaddress';
import PaymentMethod from './pages/paymentmethod';
import PlaceOrder from './pages/placeorder';
import OrderHistory from './pages/orderhistory';
import Search from './pages/search';

import OrderList from './pages/orderlist';
import UserList from './pages/userlist';
import ProductListAdmin from './pages/productlistadmin';

import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

import { listProductCategories } from './actions/productActions/listProductCategoryActions';
// import './App.css';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <>
      {categories ? <HeaderContainer categories={categories.data}/> : <p>No Header Categories</p>}

      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/product/:id" component={Detail}></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <Route path="/search/category/:category" component={Search} exact></Route>
          <Route path="/search/category/:category/subcategory/:subcategory" component={Search} exact></Route>
          <Route path="/search/name/:name" component={Search} exact></Route>
          <Route path="/search/category/:category/name/:name/subcategory/:subcategory/order/:order/pageNumber/:pageNumber" component={Search} exact></Route>

          <Route path="/orderlist" component={OrderList} exact></Route>
          <Route path="/userlist" component={UserList} exact></Route>
          <Route path="/productlist" component={ProductListAdmin} exact></Route>
      </Switch>
      {categories ? 
      <div>
        {/* {console.log(categories.data)} */}
      <FooterContainer categories={categories.data}/> </div>: <p>No Footer Categories</p>}
      
      
    </>
  );
}

export default App;
