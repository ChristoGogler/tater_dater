const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);

const io = require("socket.io")(server, {
    allowRequest: (request, callback) =>
        callback(
            null,
            request.headers.referer.startsWith("http://localhost:3000")
        ),
});
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (request, response) => {
    console.log("ok");
    response.sendStatus(200);
});

io.on("connection", (socket) => {
    console.log(
        new Date().toLocaleTimeString(),
        `user/socket with the id ${socket.id} is now connected`
    );

    socket.on("hello", (greeting) => {
        console.log(`Message from ${socket.id}: ${greeting}`);

        io.emit(
            "hello",
            `Welcome ${socket.id} - connection established. Let's chat!`
        );
    });

    socket.on("newChatMessage", ({ message }) => {
        console.log(`${socket.id} says: "${message}"`);
        const msg = { message, user: socket.id };
        io.emit("newChatMessage", msg);
    });
});

server.listen(3000, () => {
    console.log("Im listening!");
});
