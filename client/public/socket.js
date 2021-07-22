// import { io } from "socket.io-client";

const socket = io();

//First connection check
socket.emit("connectionCheck", { message: "Hej, wanna connect?" });

//
socket.on("connectionEstablished", ({ message }) => {
    console.log(`Connected: ${message}`);
    // do whatever you want with data:
    // manipulate the DOM
    // set some state in a react component
    // dispatch a redux action
});

//10 most recent messages
socket.on("recentMessages", ({ messages }) => {
    console.log(messages);
    //TODO: save messages --> then render them
});

// receiving new message received
socket.on("newChatMessage", ({ message, userId }) => {
    console.log(`incoming chat message from ${userId}: ${message}`);
    //TODO: save message --> then render it
});

//sending new message
if (false) {
    const message = "message content";
    const msg = { message };
    socket.emit("newChatMessage", msg);
    // if you want to send some data to the server:
    // document.querySelector("form").addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     console.log("Text: ", event.target.msg.value);
    //     const message = event.target.msg.value;
    //     console.log("Message: ", message);
    //     socket.emit("newChatMessage", { message });
    // });
}
