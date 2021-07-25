const express = require("express");
const { sessionSecret } = require("./secrets.json");
const cookieSession = require("cookie-Session");
const cookieSessionMW = cookieSession({
    secret: `${sessionSecret}`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
const app = express();
const csurf = require("csurf");
const compression = require("compression");

const path = require("path");
const { uploader } = require("./file_upload");
const { uploadFiles3 } = require("./s3");
//setup: socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (request, callback) =>
        callback(
            null,
            request.headers.referer.startsWith("http://localhost:3000")
        ),
});
const exporting = {
    io,
};
module.exports = exporting;
const { handleChatMessages } = require("./socketsHandler");

const {
    changeFriendStatus,
    checkLogin,
    csrfToken,
    findProfiles,
    findLatestProfiles,
    getFriendStatus,
    getFriendList,
    getFriendListById,
    getMyProfile,
    getPhotosById,
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
    .use(cookieSessionMW);
io.use(function (socket, next) {
    cookieSessionMW(socket.request, socket.request.res, next);
});

//SOCKET.IO CONNECTION
io.on("connection", handleChatMessages);

//CSRF Token
app.use(csurf());
app.use(csrfToken);

//GET MY PROFILE
app.get("/api/user", getMyProfile);

//CHECK IF LOGGED IN
app.get("/api/user/id", checkLogin);

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

// GET PHOTOS/GALLERY BY ID
app.get("/api/gallery/:id", getPhotosById);
// SAVE NEW BIO
app.put("/api/user/update/bio", saveNewBio);

//GET USER PROFILE
app.get("/api/user/:id", getUserProfile);

//FIND PROFILES
app.get("/api/users/find", findProfiles);

//FIND LATEST PROFILES
app.get("/api/users/latest", findLatestProfiles);

//GET FRIENDSHIP STATUS
app.get("/api/friendstatus/:user_id", getFriendStatus);

//CHANGE FRIEND STATUS
app.post("/api/friendrequest", changeFriendStatus);

//GET FRIENDS AND PENDING
app.get("/api/friends", getFriendList);
//GET OTHER USERS FRIENDS
app.get("/api/friends/:id", getFriendListById);

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
