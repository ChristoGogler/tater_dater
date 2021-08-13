const express = require("express");
const userRouter = express.Router();

const {
    checkLogin,
    editAccountDetails,
    findLatestProfiles,
    findProfiles,
    getMyProfile,
    getUserProfile,
    getUserProfileDetails,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
    saveNewBio,
    updateUserProfileDetails,
} = require("../routehandler.js");

//GET USER INFO & PROFILE
userRouter.get("/info", getMyProfile);
userRouter.get("/info_by_id/:id", getUserProfile);
userRouter.get("/profile/:id", getUserProfileDetails);

//UPDATE INFO & PROFILE
userRouter.put("/update/info", saveNewBio);
userRouter.put("/update/profile", updateUserProfileDetails);
userRouter.put("/update/account", editAccountDetails);

//CHECK IF LOGGED IN
userRouter.get("/verifylogin", checkLogin);

//REGISTER
userRouter.post("/register", register);

//LOGIN & LOGOUT
userRouter.post("/login", login);
userRouter.post("/logout", logout);

//PASSWORD RESET
userRouter.post("/password/reset/step1", resetPassword_step1);
userRouter.post("/password/reset/step2", resetPassword_step2);

//SEARCH & LATEST USERS
userRouter.get("/find", findProfiles);
userRouter.get("/latest", findLatestProfiles);

module.exports = userRouter;
