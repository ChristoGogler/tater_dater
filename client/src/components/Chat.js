import { useSelector } from "react-redux";
// import ChatInput from "./ChatInput.js";
import { socket } from "../../public/socket.js";

export default function Chat() {
    //pull chatHistory from redux store
    const chatHistory = useSelector((state) => {
        console.log("...state.chatHistory:", state.chatHistory);
        return state.chatHistory;
    });
    const newMessages = useSelector((state) => {
        console.log("...state.newMessages:", state.newMessages);
        return state.newMessages;
    });

    // const [newChatmessage, setNewChatmessage] = useState("");

    //OnSendButtonClick: emit message, empty input field
    const onSendButtonClick = () => {
        const text = document.querySelector("input").value;
        socket.emit("newChatMessageToServer", { chatmessage: text });
        // setNewChatmessage("");
    };

    const renderChathistory = (messages) => {
        return (
            messages &&
            messages.map(
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
            <ul>
                {renderChathistory(chatHistory)}
                {renderChathistory(newMessages)}
            </ul>
            {/* <ChatInput /> */}
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
        </section>
    );
}
