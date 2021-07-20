import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({
    otherUser_id,
    smallButton,
    onFriendStatusChange,
}) {
    //4 states of the button: request, accept, cancel, unfriend
    //3 states of friendship: null, pending, friends
    const [friend_status, setFriendStatus] = useState("");
    const [buttonState, setButtonState] = useState("");
    const [iconState, setIconState] = useState("");
    const [rejectButtonState, setRejectButtonState] = useState(false);
    const [message, setMessage] = useState("");

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
        try {
            const { data } = await axios.post(
                `/api/friendrequest?action=${buttonState}&user2_id=${otherUser_id}`
            );
            setFriendStatus(data);
            setRejectButtonState(false);
            if (onFriendStatusChange) {
                onFriendStatusChange(friend_status.status);
            }
        } catch (error) {
            console.log("ERROR changing friendship status: ", error);
            setMessage(
                `Trouble to ${buttonState} friendship. Try again later!`
            );
        }
    };

    const onRejectButtonClick = async () => {
        try {
            const { data } = await axios.post(
                `/api/friendrequest?action=cancel&user2_id=${otherUser_id}`
            );
            setFriendStatus(data);
            setRejectButtonState(false);
            onFriendStatusChange(friend_status.status);
        } catch (error) {
            console.log("ERROR rejecting friendship request: ", error);
            setMessage(
                `Trouble to reject friendship request. Try again later!`
            );
        }
    };

    return (
        <div className={smallButton ? smallButton : "buttonsWrapper"}>
            <button
                className="button submitButton btnPadding tooltip"
                onClick={onButtonClick}
            >
                {smallButton && (
                    <span className="tooltiptext">{buttonState}</span>
                )}

                <span className="flex">
                    <i className="material-icons white">{iconState}</i>
                    {!smallButton && (
                        <span className="hideLabel">{buttonState}</span>
                    )}
                </span>
            </button>
            {/* reject button in case of pending request */}
            {!smallButton && rejectButtonState && (
                <button
                    className="button submitButton btnPadding tooltip"
                    onClick={onRejectButtonClick}
                >
                    {smallButton && <span className="tooltiptext">reject</span>}
                    <span className="flex">
                        <i className="material-icons white">person_remove</i>
                        <span className="hideLabel">reject</span>
                    </span>
                </button>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}
