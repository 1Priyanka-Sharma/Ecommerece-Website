const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "Sample id", url: "ProfilePicUrl" },
  });
  const token=user.getJWTToken();
  res.status(201).json({ success: true, token });
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {  email, password } = req.body;
     // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

//   password:{select:false} given 
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const token=user.getJWTToken();
  res.status(201).json({ success: true, token });
});
    