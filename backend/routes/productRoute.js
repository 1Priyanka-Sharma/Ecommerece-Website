const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');

// cretaed mini-app
const router=new express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);;
router.route("/product/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct);

module.exports=router;