import { socket } from "../../public/socket.js";
import React from "react";

export default function ChatInput() {
    let textInput = React.createRef();
    //OnSendButtonClick: emit message, empty input field
    const onSendButtonClick = () => {
        const text = textInput.current.value;
        socket.emit("newChatMessageToServer", { chatmessage: text });
        textInput.current.value = "";
    };

    return (
        <div className="chatFormWrapper">
            <label className="searchBox" forhtml="searchuser">
                <input
                    ref={textInput}
                    name="chatinput"
                    type="text"
                    placeholder="type your message..."
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            onSendButtonClick();
                        }
                    }}
                />
                <button type="submit" onClick={() => onSendButtonClick()}>
                    <i className="material-icons">send</i>
                </button>
            </label>
        </div>
    );
}
