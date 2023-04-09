const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
//import routes
const productRoute = require("./Routes/productRoutes");
const userRoute = require("./Routes/userRoutes");
const orderRoute = require("./Routes/orderRoutes");


//Middleware
app.use("/api/v2", productRoute);
app.use("/api/v2", userRoute);
app.use("/api/v2", orderRoute);

app.use(ErrorHandler);
module.exports = app;