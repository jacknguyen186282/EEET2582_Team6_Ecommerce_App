import { Header } from "../components";
import { Link, Route } from 'react-router-dom';
import { Button } from "../components/cover/styles/cover";
import { useDispatch, useSelector } from 'react-redux';
import * as Auth from "../lib/Auth";
import { signout } from '../actions/userActions/signoutActions';
import SearchBox from '../components/SearchBox';



export const HeaderContainer = ({ categories }) => {
  // const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
  // const clientId = "4mpuhie909kgds8i0pcie8kaif";
  // const redirectSignInUrl = "http://localhost:5500/?action=signin";
  // const redirectSignUpUrl = "http://localhost:5500/?action=signup";
  // const logoutUrl = "http://localhost:5500"
  // const signinScope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
  // const signupScope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
  // const responseType = "code";

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // console.log(userInfo);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Header>
      {/* ----- TOP CONTAINER ----- */}
      <Header.TopContainer>
        <Header.Wrapper>
          <Header.Contact>
            <Header.TextLink href="#">Contact Us <i className="far fa-paper-plane"></i></Header.TextLink>
          </Header.Contact>
          <Header.Logo to="/">EEET2582 Ecommerce Shop</Header.Logo>
          <Header.Nav>
          {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  {/* <li>
                    <Link to="/support">Support</Link>
                  </li> */}
                </ul>
              </div>
            )}
            &nbsp; &nbsp;
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <a href={`${Auth.authDomain}/login?response_type=${Auth.responseType}&client_id=${Auth.clientId}&redirect_uri=${Auth.redirectEncodedUrl}&scope=${Auth.scope}`}>Signin &nbsp;</a>
                <a href={`${Auth.authDomain}/signup?response_type=${Auth.responseType}&client_id=${Auth.clientId}&redirect_uri=${Auth.redirectEncodedUrl}&scope=${Auth.scope}`}>Signup &nbsp;</a>
              </div>
            )}
            <Header.IconLink to="/cart"><i className="fas fa-shopping-cart">Cart</i></Header.IconLink>
            <span className="badge">{cartItems.length}</span>             
            {/* {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )} */}
          </Header.Nav>
        </Header.Wrapper>
      </Header.TopContainer>

      {/* ----- BOTTOM CONTAINER ----- */}
      <Header.BottomContainer>
        <Header.Dropdown categories={categories} />
        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        {/* <Header.Search></Header.Search> */}
      </Header.BottomContainer>
    </Header>
  )
}