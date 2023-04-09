import React from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/background.jpg";
import bg2 from "../../Assets/background2.jpg";

const Home = () => {
  return (
    <>
      {/* Carousel */}
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

      </div>
      <h2 className="homeHeading">Offer Products</h2>
      <span className="cursive">No offer is running right now...</span>
      <div className="offerItems"></div>
    </>
  );
};

export default Home;
