const ErrorHandler = require("../utils/errorhander");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

//   Incorrect Mongodb Id Error
if(err.name==="CastError"){
    const message=`Resource not found.Invalid:${err.path}`;
    err=new ErrorHandler(message,404);
}
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
