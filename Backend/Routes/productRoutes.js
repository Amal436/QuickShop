const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    createProductReview, 
    getSingleProductReviews,
    deleteReview} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.post("/product/create", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getSingleProduct);
router.get("/products", getAllProducts);
router.post("/product/review", isAuthenticatedUser, createProductReview);
router.get("/reviews",getSingleProductReviews);
router.delete("/reviews",isAuthenticatedUser,authorizeRoles("admin"),deleteReview);

module.exports = router;