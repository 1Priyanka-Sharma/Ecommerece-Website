const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema= new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    // 
    resetPasswordExpire: Date,
  });
  
  // To hash the password before saving it.
  userSchema.pre("save", async function (next) {

    // This is for update Profile:- If password is modified then only hash the changed password otherwise the stored password id already hashed.
  //  isModified()-mongoose function Returns true if any of the given paths is modified, else false.
    if (!this.isModified("password")) {
      next();
    }
      this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JWT TOKEN-to remberer that particular user for future interactions-token generated and stored in cookie

  // Use "methods" on individual documents if you want to manipulate the individual document like adding tokens etc. Use the statics approach if you want query the whole collection.
  userSchema.methods.getJWTToken = function () {
    
    // Particular user signing in-Payload+Secret_key
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare Password
    userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  // Generating Password Reset Token
  userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };
  
  module.exports = mongoose.model("User", userSchema);