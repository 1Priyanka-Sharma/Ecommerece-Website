// Created Express App
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

// Middleware for Error
const errorMiddleware=require('./middleware/error');

// To parse incoming request -it is called for every request/path.
app.use(express.json());
app.use(cookieParser);

// Imported Route Folders
const productRoute=require('./routes/productRoute');
const userRoute=require('./routes/userRoute');
const orderRoute=require('./routes/orderRoute');

app.use('/api',productRoute);
app.use('/api',userRoute);
app.use('/api',orderRoute);

// MiddleWare for Errors-   next() = will call this middleware as its after app.use('/api)-it is called for every request/path. Eg:-updateProduct, deleteProduct
app.use(errorMiddleware);

module.exports=app;