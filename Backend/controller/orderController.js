const Order = require('../models/orderModel');
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const productModels = require('../models/productModels');

// Create Order

exports.createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success:true,
        order
    })
})

//Get Single order 

exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order =await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order items not found",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

// Get all orders

exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    if(!orders){
        return next(new ErrorHandler("No order found for this user",404));
    }

    res.status(200).json({
        success:true,
        orders
    })
})

// Get all orders of all the users --->Admin

exports.getAdminAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders =await Order.find();

    if(!orders){
        return next(new ErrorHandler("No orders found",404));
    }

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//Update Order Status --->Admin

exports.updateAdminOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }

    // If order is shipped update the stock of that item --->Admin
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(item)=>{
            await updateStock(item.product,item.quantity);
        })
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.delivereAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })

    async function updateStock(id,quantity){
        const product = await productModels.findById(id);
        product.stock-=quantity;
        await product.save({validateBeforeSave:false});
    }
})

//Delete Order --->Admin

exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    await order.remove();
    
    res.status(200).json({
        success:true,
    })
})