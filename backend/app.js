// Created Express App
const express=require('express');
const app=express();

// Middleware for Error
const errorMiddleware=require('./middleware/error');

// To parse incoming request -it is called for every request/path.
app.use(express.json());

// Imported Route Folder
const product=require('./routes/productRoute');
const user=require('./routes/userRoute');
app.use('/api',product);
app.use('/api',user);

// next() = will call this middleware as its after app.use('/api)-it is called for every request/path. Eg:-updateProduct, deleteProduct
app.use(errorMiddleware);

module.exports=app;