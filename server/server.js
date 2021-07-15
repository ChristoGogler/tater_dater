const express = require("express");
const cookieSession = require("cookie-Session");
const app = express();
const csurf = require("csurf");
const compression = require("compression");
const { sessionSecret } = require("./secrets.json");
const path = require("path");
const { uploader } = require("./file_upload");
const { uploadFiles3 } = require("./s3");

const {
    checkLogin,
    csrfToken,
    findProfiles,
    getMyProfile,
    getUserProfile,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
    saveNewBio,
    saveProfilePictureUrl,
} = require("./routehandler");

app.use(compression());

//express public folder
app.use(express.static(path.join(__dirname, "..", "client", "public")))
    .use(express.json())
    .use(
        cookieSession({
            secret: `${sessionSecret}`,
            maxAge: 1000 * 60 * 60 * 24 * 14,
        })
    );

//CSRF Token
app.use(csurf());
app.use(csrfToken);

//GET MY PROFILE
app.get("/api/user", getMyProfile);

//CHECK IF LOGGED IN
app.get("/api/user/id.json", checkLogin);

//REGISTER
app.post("/api/register", register);

//LOGIN & LOGOUT
app.post("/api/login", login);
app.post("/api/logout", logout);

//PASSWORD  RESET
app.post("/api/password/reset/step1", resetPassword_step1);
app.post("/api/password/reset/step2", resetPassword_step2);

//UPLOAD PROFILE PICTURE
app.post(
    "/api/upload",
    uploader.single("file"),
    uploadFiles3,
    saveProfilePictureUrl
);
// SAVE NEW BIO
app.put("/api/user/update/bio", saveNewBio);

//GET USER PROFILE
app.get("/api/user/:id", getUserProfile);

//FIND PROFILES
app.get("/api/users/find", findProfiles);

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
