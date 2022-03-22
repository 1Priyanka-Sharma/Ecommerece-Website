const express=require('express');
const { registerUser,loginUser, logout, forgotPassword,resetPassword } = require('../controllers/userController');
const router=new express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/paswword/forgot").post(forgotPassword);
router.route("/paswword/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports=router;