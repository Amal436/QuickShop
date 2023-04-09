const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');

const sendMail = require('../utils/sendMail');

// Register user (for new user)

exports.createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, role } = req.body;  //destructuring

    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            publid_id: "https://test.com",
            url: "https://test.com"
        },
        role
    })

    sendToken(user, 200, res);
})

// Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter your email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Email or password is wrong", 401));
    }
    sendToken(user, 200, res);
});

// Log out user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Log out success"
    })
})

//Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    //get ResetPasswordToken

    const resetToken = user.getResetToken();

    await user.save({
        validateBeforeSave: false
    });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;
    try {
        await sendMail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} succesfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTime = undefined;
    }

    await user.save({
        validateBeforeSave: false
    });

    return next();
})

// Reset Password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    // Create Token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTime: {$gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset password url is invalid or has been expired",400));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Password is not matched with the new password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save();

    sendToken(user,200,res);
})

// Get user details

exports.userDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

// Update user password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
      return next(new ErrorHandler("Old password is incorrect",400));
    };

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("new password is not matched with confirm password",400));
    };

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
})

//Update User Profile

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //We add cloudinary latter then we will be giving condition for avtar

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
    })
})

//Get all users --->Admin
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// Get Single User detail --->Admin
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User is not found with this id",400));
    }

    res.status(200).json({
        success:true,
        user
    })
})

// Change user role --->Admin

exports.updateUserRole = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
    })
})

// Delete user --->Admin

exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user not found",400));
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
})
