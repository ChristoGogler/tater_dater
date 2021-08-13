const express = require("express");
const compression = require("compression");
const csurf = require("csurf");
const path = require("path");

const userRouter = require("./routes/userRoutes.js");

const { sessionSecret } = require("./secrets.json");
const cookieSession = require("cookie-Session");
const cookieSessionMW = cookieSession({
    secret: `${sessionSecret}`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
const app = express();

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
    csrfToken,
    editAccountDetails,
    getAllPotatoes,
    getPotatoById,
    getFriendStatus,
    getFriendList,
    getFriendListById,
    getAllPhotosById,
    getUserProfileDetails,
    saveNewBio,
    saveProfilePictureUrl,
    updateProfilePic,
    updatePotatoes,
    updateUserProfileDetails,
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

//USER ROUTES
app.use("/api/user", userRouter);

//UPLOAD PROFILE PICTURE
app.post(
    "/api/upload",
    uploader.single("file"),
    uploadFiles3,
    saveProfilePictureUrl
);
app.post("/api/setprofilepic", updateProfilePic);

// GET PHOTOS/GALLERY BY ID
app.get("/api/gallery/:id", getAllPhotosById);

//GET FRIENDSHIP STATUS
app.get("/api/friendstatus/:user_id", getFriendStatus);

//CHANGE FRIEND STATUS
app.post("/api/friendrequest", changeFriendStatus);

//GET FRIENDS AND PENDING
app.get("/api/friends", getFriendList);

//GET OTHER USERS FRIENDS
app.get("/api/friends/:id", getFriendListById);

//GET POTATOES
app.get(`/api/potatoes/:id`, getAllPotatoes);
app.post(`/api/addpotato`, updatePotatoes);
app.get(`/api/potato/:id`, getPotatoById);

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
