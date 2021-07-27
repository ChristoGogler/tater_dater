import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput.js";
import { Link } from "react-router-dom";

export default function Chat() {
    //pull chatHistory from redux store
    const chatHistory = useSelector((state) => {
        return state.chatHistory;
    });
    const newMessages = useSelector((state) => {
        return state.newMessages;
    });
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        console.log("CLICK");
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [newMessages, chatHistory]);

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
                                    <Link
                                        to={
                                            sender_id == -1
                                                ? "/"
                                                : "/user/" + sender_id
                                        }
                                    >
                                        <img src={profile_url} alt="" />
                                    </Link>
                                </div>
                                <div>
                                    <div>
                                        <Link
                                            to={
                                                sender_id == -1
                                                    ? "/"
                                                    : "/user/" + sender_id
                                            }
                                        >
                                            <p
                                                className={
                                                    sender_id == -1
                                                        ? "chatauthorSelf"
                                                        : "chatauthor"
                                                }
                                            >
                                                {first_name + " " + last_name}
                                            </p>
                                        </Link>
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
                <div ref={messagesEndRef}></div>
            </ul>
            <ChatInput scrollToBottom={scrollToBottom} />
        </section>
    );
}
