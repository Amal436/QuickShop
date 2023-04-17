// eslint-disable-next-line
import React, { useRef } from "react";
import "./Header.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {

  //const switcherTab = useRef(null);
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".navbar").classList.add("active");
    } else {
      document.querySelector(".navbar").classList.remove("active");
    }
  })

  return (
    <div className="Header">
      {/* Header topBar */}
      <div className="Header__topbar space__beetween">
        {/* topbar Left */}
        <div className="logo pxy__10">
          <Link to="/">
            <img
              src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg"
              alt=""
              className="logo"
              style={{
                width: "150px",
                height: "100px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
        {/* topbar Middle */}

        <div
          className="searchBoxHome"
          style={{
            width: "50%",
            position: "relative",
          }}
        >
          <div
            className="inputBox"
            style={{
              display: "flex",
              alignItems: "center",
              height: "30px",
              width: "100%",
              background: "orange",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: "white",
              }}
            >
              Welcome to our shop...You can find anything here as your
              favourites..
            </span>
          </div>
        </div>

        <div
          className="flex align__items__center"
          style={{
            margin: "0px 10px",
          }}
        >
          <div>
            {/* envelope logo */}
            <MailOutlineIcon
              style={{ width: "30px", height: "30px", color: "#3BB77E" }}
            />
          </div>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "1rem",
            }}
          >
            <strong
              style={{
                padding: "0px 5px",
              }}
            >
              Email:
            </strong>
            temp123@gmail.com
          </span>
        </div>
      </div>
      {/* Header Navbar */}
      <div className="navbar flex pz__10 space__beetween" >
        <div
          className="navigation"
          style={{
            padding: "0px 50px",
          }}
        >
          <ul
            style={{
              fontFamily: "sans-serif",
              cursor: "pointer",
              display: "flex",
              listStyle: "none",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>
            <Link to="/creator">
              <li>Become A Seller</li>
            </Link>
            <Link to="/faq">
              <li>Users Rules</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>

        <div className="rightoption flex align__items__center">
          <div>
            <Link to="/search">
              <SearchIcon style={{ width: "35px", height: "35px", color: "black" }} />
            </Link>
          </div>
          <div className="heart__products flex pointer relative">
            <Link to="/favourites">
              <FavoriteBorderIcon style={{ width: "30px", height: "30px", color: "black" }} />
            </Link>
            <div
              className="heart__numbers"
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#95C730",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "-40%",
                right: "3.5%",
              }}
            >
              <span>{favouriteItems.length}</span>
            </div>
          </div>
          <div className="cart__items flex align__items__center">
            <div className="cart__items flex pointer relative">
              <Link to="/cart">
                <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "black" }} />
              </Link>
              <div
                className="heart__numbers"
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#95C730",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "-40%",
                  right: "3.5%",
                }}
              >
                <span>{cartItems.length}</span>
              </div>
            </div>
          </div>
          <div className="user__account flex pointer">
            <Link to="/login">
              <PersonOutlineIcon style={{ width: "35px", height: "35px", color: "black" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
