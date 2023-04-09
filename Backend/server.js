const app=require("./app");
const dotenv=require("dotenv");
const { connectDatabase } = require("./db/database");

// making configuration for .env file
dotenv.config({
    path:"./config/.env"
});

//Database Connection
connectDatabase();

//creating server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
