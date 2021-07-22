// // import { io } from "socket.io-client";

// const socket = io();

// socket.on("hello", (data) => {
//     console.log(`Incoming message: ${data}`);
//     // do whatever you want with data:
//     // manipulate the DOM
//     // set some state in a react component
//     // dispatch a redux action
// });

// socket.on("newChatMessage", ({ user, message }) => {
//     console.log(`incoming chat message from ${user}: ${message}`);
//     const node = document.querySelector("#listofmsg");

//     const child = document.createElement("li");
//     child.innerHTML = `
//             <p>
//                 <strong>${user}</strong> says: ${message}
//             </p>`;

//     node.appendChild(child);
//     console.log("Node: ", node, typeof node);
// });
// socket.emit("hello", "Hello Server - wanna connect?");

// // if you want to send some data to the server:
// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault();
//     console.log("Text: ", event.target.msg.value);
//     const message = event.target.msg.value;
//     console.log("Message: ", message);
//     socket.emit("newChatMessage", { message });
// });
