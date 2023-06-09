import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/background.jpg";
import bg2 from "../../Assets/background2.jpg";
import { getproduct } from "../../Actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Products/productCard";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../Footer/Footer";
import UserData from "../../more/UserData";
import { ToastContainer, Slide } from 'react-toastify';
import BottomTab from "../../more/BottomTab";


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getproduct());
  }, [dispatch]);
  return (
    <>
      {/* Carousel */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <MetaData title="Home" />
      {isAuthenticated && <UserData user={user} />}
      <Header />
      <div className="banner">
        <Carousel>
          <img src={bg} alt="" className="bgImg" />
          <img src={bg2} alt="" className="bg2Img" />
        </Carousel>
        <div className="home__content">
          <div className="hc1">
            <h2>Buy 2 Get</h2>
            <span>1 Free</span>
          </div>
          <div className="hc2">
            <h2>Fashionable</h2>
          </div>
          <div className="hc3">
            <h2>Collection</h2>
          </div>
          <div className="hc4">
            <h2>Get free shipping on all orders of $99.</h2>
          </div>
          <div className="hc5">
            <a href="#container">
              <button type="submit">Shop Now</button>
            </a>
          </div>
        </div>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <h2 className="homeHeading">Offer Products</h2>
      <span className="cursive">No offer is running right now...</span>
      <div className="offerItems"></div>
      <Footer />
      <BottomTab/>
    </>
  );
};

export default Home;
