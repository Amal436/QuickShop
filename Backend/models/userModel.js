const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minlength:[3,"name should be of minimum 3 characters"],
        maxlength:[15,"name should be of maximum 15 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail,"Please enter a valid email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"password should be of minimum 8 characters"],
        select:false
    },
    avtar:{
        public_id:{
            type:String,
           // required:true,
        },
        url:{
            type:String,
            //required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
})

// hash password

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Forgot Password
userSchema.methods.getResetToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordTime = Date.now()+15*60*1000;
    
    return resetToken;
}

//jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    });
}


module.exports = mongoose.model("User",userSchema);