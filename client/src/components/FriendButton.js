import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ otherUser_id }) {
    //4 states of the button: request, accept, cancel, unfriend
    //3 states of friendship: null, pending, friends
    const [friend_status, setFriendStatus] = useState("");
    const [buttonState, setButtonState] = useState("");
    const [iconState, setIconState] = useState("");
    const [rejectButtonState, setRejectButtonState] = useState(false);

    //when otherUser_id changes
    useEffect(async () => {
        const { data } = await axios.get(`/api/friendstatus/${otherUser_id}`);
        setFriendStatus(data);
    }, [otherUser_id]);

    //when friend_status changes
    useEffect(() => {
        if (friend_status.status == null) {
            setButtonState("request");
            setIconState("person_add");
            return;
        }
        if (friend_status.status == "friends") {
            setButtonState("unfriend");
            setIconState("person_remove");
            return;
        }
        if (
            friend_status.status == "pending" &&
            friend_status.sender == otherUser_id
        ) {
            setButtonState("accept");
            setRejectButtonState(true);
            setIconState("person_add");
            return;
        } else {
            setButtonState("cancel");

            setIconState("person_add_disabled");

            return;
        }
    }, [friend_status]);

    const onButtonClick = async () => {
        const { data } = await axios.post(
            `/api/friendrequest?action=${buttonState}&user2_id=${otherUser_id}`
        );
        setFriendStatus(data);
        setRejectButtonState(false);
    };

    const onRejectButtonClick = async () => {
        const { data } = await axios.post(
            `/api/friendrequest?action=cancel&user2_id=${otherUser_id}`
        );
        setFriendStatus(data);
        setRejectButtonState(false);
    };

    return (
        <div className="buttonsWrapper">
            <button className="button submitButton" onClick={onButtonClick}>
                <span className="flex">
                    <i className="material-icons white">{iconState}</i>
                    {buttonState}
                </span>
            </button>
            {rejectButtonState && (
                <button
                    className="button submitButton"
                    onClick={onRejectButtonClick}
                >
                    <span className="flex">
                        <i className="material-icons white">person_remove</i>
                        reject
                    </span>
                </button>
            )}
        </div>
    );
}
