const express = require("express");
const compression = require("compression");
const csurf = require("csurf");
const path = require("path");
const cookieSessionMW = require("./middlewares/cookiesession");

const userRouter = require("./routes/userRoutes.js");
const friendshipRouter = require("./routes/friendshipRoutes.js");
const potatoRouter = require("./routes/potatoRoutes.js");

const app = express();

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
const { handleChatMessages } = require("./middlewares/sockets");

const csrfToken = require("./middlewares/csrf");

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
//FRIENDSHIP ROUTES
app.use("/api/friendship", friendshipRouter);
//POTATO ROUTES
app.use("/api/potato", potatoRouter);

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
