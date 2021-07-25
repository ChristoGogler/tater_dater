import { useSelector } from "react-redux";
import ChatInput from "./ChatInput.js";

export default function Chat() {
    //pull chatHistory from redux store
    const chatHistory = useSelector((state) => {
        return state.chatHistory;
    });
    const newMessages = useSelector((state) => {
        return state.newMessages;
    });

    const renderChatMessages = (messages) => {
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
                {renderChatMessages(chatHistory)}
                {renderChatMessages(newMessages)}
            </ul>
            <ChatInput />
        </section>
    );
}
