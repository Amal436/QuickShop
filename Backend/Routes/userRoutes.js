const express = require('express');
const { createUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    userDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser, 
    updateUserRole,
    deleteUser} = require('../controller/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, userDetails);
router.put("/me/update", isAuthenticatedUser, updatePassword);
router.put("/me/update/info", isAuthenticatedUser, updateProfile);
router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports = router;