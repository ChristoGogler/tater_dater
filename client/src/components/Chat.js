import { socket } from "../../public/socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatHistory = useSelector((state) => {
        console.log("...(Chat) state: ", state);

        console.log("...(Chat) chatHistory: ", chatHistory);
        return state.chatHistory;
    });

    return (
        <>
            <section className="chatWrapper">
                <ul>
                    {chatHistory &&
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
                                                        {first_name +
                                                            " " +
                                                            last_name}
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

                                                <p className="timestamp">
                                                    {created_at}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                </ul>
            </section>
            <section className="chatFormWrapper">
                <label className="searchBox" forhtml="searchuser">
                    <input
                        name="chatinput"
                        type="text"
                        placeholder="type your message..."
                    />
                    <button type="submit">
                        <i className="material-icons">send</i>
                    </button>
                </label>
            </section>
        </>
    );
}
