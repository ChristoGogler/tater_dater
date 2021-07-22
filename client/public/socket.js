import io from "socket.io-client";
import { recentMessages, newChatMessage } from "../src/actions/index";
export let socket;
export const initialiseSocket = (store) => {
    if (!socket) {
        //First connection
        socket = io.connect();

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
            console.log("ON recentMessages: ", messages);
            store.dispatch(recentMessages(messages));

            //TODO: save messages to global state --> then render them
        });

        // receiving new message received
        socket.on("newChatMessage", ({ message, userId }) => {
            console.log(`incoming chat message from ${userId}: ${message}`);
            //TODO: save message to global state --> then render it
            store.dispatch(newChatMessage(message));
        });

        //sending new message
        //TODO: grab message from UI --> then emit
        if (false) {
            const chatmessage = "message content";
            const msg = { chatmessage };
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
    }
};
