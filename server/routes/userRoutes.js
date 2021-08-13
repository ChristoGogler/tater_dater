const express = require("express");
const userRouter = express.Router();

const { uploader } = require("../file_upload");
const { uploadFiles3 } = require("../s3");

const {
    checkLogin,
    editAccountDetails,
    findLatestProfiles,
    findProfiles,
    getMyProfile,
    getAllPhotosById,
    getUserProfile,
    getUserProfileDetails,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
    saveNewBio,
    saveProfilePictureUrl,
    updateProfilePic,
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

//UPLOAD PROFILE PICTURE
userRouter.post(
    "/uploadphoto",
    uploader.single("file"),
    uploadFiles3,
    saveProfilePictureUrl
);
userRouter.post("/setprofilepic", updateProfilePic);

// GET PHOTOS/GALLERY BY ID
userRouter.get("/gallery/:id", getAllPhotosById);

module.exports = userRouter;
