const app=require("./app");
const dotenv=require("dotenv");
const cloudinary = require('cloudinary');
const { connectDatabase } = require("./db/database");

// making configuration for .env file
dotenv.config({
    path:"./config/.env"
});

//Database Connection
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

//creating server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
