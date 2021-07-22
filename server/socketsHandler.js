const { io } = require("./server");
const {
    getLatestChatmessages,
    saveChatmessage,
    getUserById,
} = require("./db_queries");
const limit = 10;

const handleChatMessages = (socket) => {
    //disconnect if not a logged in user!
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const socketId = socket.id;
    const userId = socket.request.session.userId;

    // First Connection Check
    socket.on("connectionCheck", async ({ message }) => {
        console.log(`Message from ${userId}: ${message}`);
        io.emit("connectionEstablished", {
            message: "Connection established. Lets chat!",
        });
        //EMIT the 10 latest chat messages to the socket that just connected
        const messages = await getLatestChatmessages({ limit });
        console.log("SH latestMessages: ", messages);
        io.to(socketId).emit("recentMessages", {
            messages,
        });
    });

    //receiving new message
    socket.on("newChatMessage", async ({ chatmessage }) => {
        const { id, created_at } = await saveChatmessage({
            userId,
            chatmessage,
        });

        const { first_name, last_name, profile_url } = await getUserById(
            userId
        );
        io.emit("newChatMessage", {
            id,
            userId,
            first_name,
            last_name,
            profile_url,
            chatmessage,
            created_at,
        });
    });
};

const exporting = {
    handleChatMessages,
};
module.exports = exporting;
