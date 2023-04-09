const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the name of the product"],
        trim: true,
        maxlength: [100, "product Name should not exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "please add the description of the product"],
        maxlength: [4000, "Description can't exceed than 4000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please add price for your product"],
    },
    discountPrice: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Please add the category of the product"]
    },
    stock: {
        type: Number,
        required: [true, "Please add stock for your product"]
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
            },
            time: {
                type: Date,
                default: Date.now()
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("product", productSchema);