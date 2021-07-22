import { socket } from "../../public/socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatHistory = useSelector((state) => {
        console.log("...(Chat) chatHistory: ", chatHistory);
        return state.chatHistory;
    });

    return (
        <>
            <p>Chat Component!</p>

            <section className="chatWrapper">
                <ul>
                    {chatHistory &&
                        chatHistory.map(
                            ({
                                id,
                                userId,
                                first_name,
                                last_name,
                                profile_url,
                                chatmessage,
                                created_at,
                            }) => {
                                return (
                                    <li key={id} className="singleMessage">
                                        <div className="messageWrapper">
                                            <div>
                                                <img
                                                    className="chatImg"
                                                    src={profile_url}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <div>
                                                    <p>
                                                        <span>
                                                            {first_name}{" "}
                                                            {last_name}
                                                        </span>
                                                    </p>
                                                    <q>{chatmessage}</q>
                                                </div>
                                                <p>{created_at}</p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                </ul>
            </section>
        </>
    );
}
