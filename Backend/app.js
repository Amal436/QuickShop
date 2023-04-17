const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

dotenv.config({
    path: "./config/.env"
});

//import routes
const productRoute = require("./Routes/productRoutes");
const userRoute = require("./Routes/userRoutes");
const orderRoute = require("./Routes/orderRoutes");
const paymentRoute = require("./Routes/paymentRoutes");


//Middleware
app.use("/api/v2", productRoute);
app.use("/api/v2", userRoute);
app.use("/api/v2", orderRoute);
app.use("/api/v2", paymentRoute);

app.use(cors());
app.use(ErrorHandler);
module.exports = app;