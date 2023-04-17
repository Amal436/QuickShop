import { useEffect, React, useState } from 'react';
import './App.css';
import Header from './components/Home/Header';
import Home from './components/Home/Home';
import WebFont from 'webfontloader';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import ProductDetails from './components/Products/productDetails';
import LoginSignup from './components/Authentication/LoginSignup';
import { useDispatch, useSelector } from 'react-redux';
import UserData from './more/UserData';
import { loadUser } from './Actions/userActions';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import Profile from './components/user/Profile';
import UpdatePassword from './components/user/UpdatePassword';
import EditProfile from './components/user/EditProfile';
import About from './components/About/About';
import Products from './components/Products/Products';
import Search from './components/Products/Search';
import Report from './more/Report';
import BottomTab from './more/BottomTab';
import Cart from './components/Cart/Cart';
import Favourite from './components/Cart/Favourites';
import Favourites from './components/Cart/Favourites';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import Success from './components/Cart/Success';
import MoreOptions from './components/user/MoreOptions';
import MyOrder from './components/user/MyOrder';

function App() {

  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/product/:id",
      element: <ProductDetails />
    },
    {
      path: "/login",
      element: <LoginSignup />
    },
    {
      path: "/me",
      element: <ProtectedRoute element={<Profile />} />
    },
    {
      path: "/me/update",
      element: <ProtectedRoute element={<UpdatePassword />} />
    },
    {
      path: "/me/update/info",
      element: <ProtectedRoute element={<EditProfile />} />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/products/:keyword",
      element: <Products />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/report",
      element: <Report />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/favourites",
      element: <Favourites />
    },
    {
      path: "/shipping",
      element: <ProtectedRoute element={<Shipping />} />
    },
    {
      path: "/order/confirm",
      element: <ProtectedRoute element={<ConfirmOrder />} />
    },
    {
      path: "/process/payment",
      element: stripeApiKey && (<Elements stripe={loadStripe('pk_test_51MxToGSG0iCdK7yatj0YnSdnrVulvywu1sM7nwPNjueNotNRtyoUXZ6RpFHxUvQmAGwjwPi6uV9sdUd3UeR8o5c200UdGgv1hD')}><ProtectedRoute element={<Payment />} /></Elements>)
    },
    {
      path: "/success",
      element: <ProtectedRoute element={<Success />} />
    },
    {
      path: "/more",
      element: <MoreOptions />
    },
    {
      path: "/orders",
      element: <ProtectedRoute element={<MyOrder />} />
    }
  ])

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch, stripeApiKey])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
