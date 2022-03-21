// Created Express App
const express=require('express');
const app=express();

// Middleware for Error
const errorMiddleware=require('./middleware/error');

// To parse incoming request -it is called for every request/path.
app.use(express.json());

// Imported Route Folder
const product=require('./routes/productRoute');
app.use('/api',product);

// next() = will call this middleware as its after app.use('/api)-it is called for every request/path. Eg:-updateProduct, deleteProduct
app.use(errorMiddleware);

module.exports=app;