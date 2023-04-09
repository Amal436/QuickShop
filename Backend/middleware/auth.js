// For protected routes
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login for access these resources",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);
    next();
})

// Admin roles
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} can't access this resource`));
        };
        next();
    }
}