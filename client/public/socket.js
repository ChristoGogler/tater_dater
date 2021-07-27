//CLIENT

import io from "socket.io-client";
import { recentMessages, newChatMessage } from "../src/actions/index";
export let socket;
export const initialiseSocket = (store) => {
    if (!socket) {
        //First connection
        socket = io.connect();

        //10 most recent messages
        socket.on("recentMessages", ({ messages }) => {
            // console.log("...(Client) messages received:", messages);
            store.dispatch(recentMessages(messages));
        });

        // receiving new message received
        socket.on("newChatMessageToClients", (message) => {
            // console.log("...(Client) message received:", message);
            store.dispatch(newChatMessage(message));
        });
    }
};
