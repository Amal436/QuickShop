import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import MetaData from "../../more/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../Actions/productDetailActions";
import { clearError } from "../../reducers/productDetailSlice";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./productDetail.css";
import Footer from "../Footer/Footer";
import Rating from "@mui/material/Rating";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemsToCart } from "../../Actions/cartActions";
import { addFavouriteItemsToCart } from "../../Actions/favouriteActions";
import ReviewCard from "./reviewCard";
import { newReview } from "../../Actions/productActions";
import { newReviewReset } from "../../reducers/reviewSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    toast.success("Thank you for your review and rating!");

    dispatch(newReviewReset());

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error]);

  const increaseQuantity = (event) => {
    event.preventDefault();
    if (product.stock <= quantity) return toast.error("Product stock limited");
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (event) => {
    event.preventDefault();
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(id, quantity));
      toast.success("Product Added to cart");
    } else {
      toast.error("Product stock limited");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(id, quantity));
    toast.success("Product Added to Favourites");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <MetaData title={product.name} />
          <Header />
          <div className="ProductDetails">
            <div className="first__varse">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating value={product.ratings} precision={0.5} readOnly />
                <span>({product.numberOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`$${product.price}`}</h1>
                  <h1 className="discountPrice">
                    {product.offerPrice > 0 ? `$${product.offerPrice}` : ""}
                  </h1>
                </div>
                <div className="detailsBlock-3-1">
                  <span className="quantity">Quantity</span>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                </div>
                <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfstock" : "Instock"}
                  </b>
                </p>
                <div
                  className="Description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>Description:</span>
                  <p>{product.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Add to wishlist
                    </span>
                  </div>

                  <div
                    className="pointer flex"
                    style={{
                      padding: "10px 5px",
                      alignItems: "center",
                      backgroundColor: "#E4EAEC",
                    }}
                    onClick={addToCartHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <button
                      className="cartBtn"
                      style={{
                        opacity: 0.7,
                        padding: "0px 5px",
                        border: "none",
                        cursor: "pointer",
                        background: "none",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            {/* Reviews */}
            <div
              style={{
                padding: "1vmax",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  No Reviews Yet *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      precision={0.5}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
