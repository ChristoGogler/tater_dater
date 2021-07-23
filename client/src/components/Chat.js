import { useSelector } from "react-redux";
import { useState } from "react";
// import ChatInput from "./ChatInput.js";
import { socket } from "../../public/socket.js";

export default function Chat() {
    //pull chatHistory from redux store
    const chatHistory = useSelector(({ chatHistory }) => chatHistory);
    const [newChatmessage, setNewChatmessage] = useState("");

    //OnSendButtonClick: emit message, empty input field
    const onSendButtonClick = () => {
        socket.emit("newChatMessageToServer", { chatmessage: newChatmessage });
        setNewChatmessage("");
    };

    const renderChathistory = () => {
        return (
            chatHistory &&
            chatHistory.map(
                ({
                    id,
                    first_name,
                    last_name,
                    profile_url,
                    chatmessage,
                    created_at,
                    sender_id,
                }) => {
                    return (
                        <li key={id} className="singleMessage">
                            <div
                                className={
                                    sender_id == -1
                                        ? "messageWrapperSelf"
                                        : "messageWrapper"
                                }
                            >
                                <div
                                    className={
                                        sender_id == -1
                                            ? "chatImgSelf"
                                            : "chatImg"
                                    }
                                >
                                    <img src={profile_url} alt="" />
                                </div>
                                <div>
                                    <div>
                                        <p
                                            className={
                                                sender_id == -1
                                                    ? "chatauthorSelf"
                                                    : "chatauthor"
                                            }
                                        >
                                            {first_name + " " + last_name}
                                        </p>
                                        <q
                                            className={
                                                sender_id == -1
                                                    ? "chatmsgSelf"
                                                    : "chatmsg"
                                            }
                                        >
                                            {chatmessage}
                                        </q>
                                    </div>

                                    <p className="timestamp">{created_at}</p>
                                </div>
                            </div>
                        </li>
                    );
                }
            )
        );
    };

    return (
        <section className="chatWrapper">
            <ul>{renderChathistory()}</ul>
            {/* <ChatInput /> */}
            <div className="chatFormWrapper">
                <label className="searchBox" forhtml="searchuser">
                    <input
                        name="chatinput"
                        type="text"
                        placeholder="type your message..."
                        value={newChatmessage}
                        onChange={(event) =>
                            setNewChatmessage(event.target.value)
                        }
                    />
                    <button type="submit" onClick={() => onSendButtonClick()}>
                        <i className="material-icons">send</i>
                    </button>
                </label>
            </div>
        </section>
    );
}
