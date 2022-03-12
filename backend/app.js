// Created Express App
const express=require('express');
const app=express();

// Middleware for Error
const errorMiddleware=require('./middleware/error');

// To parse incoming request 
app.use(express.json());

// Imported Route Folder
const product=require('./routes/productRoute');
app.use('/api',product);

app.use(errorMiddleware);

module.exports=app;