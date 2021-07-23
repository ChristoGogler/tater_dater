import { socket } from "../../public/socket.js";

export default function ChatInput() {
    //OnSendButtonClick: emit message, empty input field
    const onSendButtonClick = () => {
        const text = document.querySelector("input").value;
        socket.emit("newChatMessageToServer", { chatmessage: text });
        document.querySelector("input").value = "";
    };
    return (
        <div className="chatFormWrapper">
            <label className="searchBox" forhtml="searchuser">
                <input
                    name="chatinput"
                    type="text"
                    placeholder="type your message..."
                />
                <button type="submit" onClick={() => onSendButtonClick()}>
                    <i className="material-icons">send</i>
                </button>
            </label>
        </div>
    );
}
