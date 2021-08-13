const express = require("express");
const userRouter = express.Router();

const {
    checkLogin,
    getMyProfile,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
} = require("../routehandler.js");

// console.log("userRoutes");
//GET USER INFO
userRouter.get("/info", getMyProfile);

//CHECK IF LOGGED IN
userRouter.get("/verifylogin", checkLogin);

//REGISTER
userRouter.post("/register", register);

//LOGIN & LOGOUT
userRouter.post("/login", login);
userRouter.post("/logout", logout);
// console.log("userRouter", userRouter);
module.exports = userRouter;
