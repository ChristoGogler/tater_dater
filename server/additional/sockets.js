const express = require("express");
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

const {
    getLatestChatmessages,
    saveChatmessage,
    getUserById,
} = require("../database/db_queries");
const limit = 10;

const handleChatMessages = async (socket) => {
    //disconnect if not a logged in user!
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const socketId = socket.id;
    const userId = socket.request.session.userId;

    //EMIT the 10 latest chat messages to the socket that just connected
    let messages = await getLatestChatmessages({ limit });
    messages = isSenderAlsoUser(messages, userId);
    // console.log("...(SH EMIT the 10 latest) messages: ", messages);

    io.to(socketId).emit("recentMessages", {
        messages,
    });

    //receiving new message
    socket.on("newChatMessageToServer", async ({ chatmessage }) => {
        const newMessage = await saveChatmessage({
            userId,
            chatmessage,
        });
        // console.log("...(SH newChatMessageToServer) newMessage: ", newMessage);

        const { first_name, last_name, profile_url } = await getUserById(
            userId
        );
        io.to(socketId).emit("newChatMessageToClients", {
            id: newMessage.id,
            sender_id: -1,
            chatmessage,
            created_at: newMessage.created_at,
            first_name,
            last_name,
            profile_url,
        });
        socket.broadcast.emit("newChatMessageToClients", {
            id: newMessage.id,
            sender_id: userId,
            chatmessage,
            created_at: newMessage.created_at,
            first_name,
            last_name,
            profile_url,
        });
    });
};

function isSenderAlsoUser(messages, userId) {
    // console.log("messages: ", messages);
    messages = messages.map((msg) => {
        if (msg.sender_id == userId) {
            msg.sender_id = -1;
            return { ...msg };
        }
        return { ...msg };
    });
    return messages;
}

module.exports = { app, io, server, handleChatMessages };
