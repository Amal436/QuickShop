const express = require("express");
const {
    createOrder,
    getSingleOrder,
    getAllOrders,
    getAdminAllOrders,
    updateAdminOrder, 
    deleteOrder} = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/order/new", isAuthenticatedUser, createOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, getAllOrders);
router.get("/admin/orders", isAuthenticatedUser, authorizeRoles("admin"), getAdminAllOrders);
router.put("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), updateAdminOrder);
router.delete("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;