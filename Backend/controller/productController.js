const productModel = require("../models/productModels");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Features = require("../utils/features");

// Create new products
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        message: product
    })
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await productModel.countDocuments();
    const feature = new Features(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    products = await feature.query;
    res.status(200).json({
        success: true,
        products
    })
});

//Update product--> Admin only
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404))
    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product--->Admin only
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404))
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    })
});

//Get Single product detail

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        product,
        productCount
    })
});

// Create review annd update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );


    if (isReviewed) {
        isReviewed.rating = rating;
        isReviewed.comment = comment;
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})

//Get All reviews of a single product

exports.getSingleProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Reviews --->Admin

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("product is not found with this id", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numberOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numberOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true
    });
})