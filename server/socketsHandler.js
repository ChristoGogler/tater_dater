const { io } = require("./server");
const {
    getLatestChatmessages,
    saveChatmessage,
    getUserById,
} = require("./database/db_queries");
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
    // messages = isSenderAlsoUser(messages, userId);
    io.to(socketId).emit("recentMessages", {
        messages,
    });

    //receiving new message
    socket.on("newChatMessageToServer", async ({ chatmessage }) => {
        const { id, created_at } = await saveChatmessage({
            userId,
            chatmessage,
        });

        const { first_name, last_name, profile_url } = await getUserById(
            userId
        );

        io.emit("newChatMessageToClients", {
            sender_id: userId,
            chatmessage,
            created_at,
            first_name,
            last_name,
            profile_url,
            id,
        });
    });
};

const exporting = {
    handleChatMessages,
};
module.exports = exporting;

function isSenderAlsoUser(messages, userId) {
    console.log("messages: ", messages);
    messages = messages.map((msg) => {
        if (msg.sender_id == userId) {
            msg.sender_id = -1;
            return { ...msg };
        }
        return { ...msg };
    });
    return messages;
}
