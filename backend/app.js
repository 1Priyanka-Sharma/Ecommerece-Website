// Created Express App
const express=require('express');
const app=express();

// To parse incoming request 
app.use(express.json());

// Imported Route Folder
const product=require('./routes/productRoute');
app.use('/api',product);

module.exports=app;