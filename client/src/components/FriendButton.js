import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ otherUser_id }) {
    //4 states of the button: request, accept, cancel, unfriend
    //3 states of friendship: null, pending, friends
    const [friend_status, setFriendStatus] = useState("");
    const [buttonState, setButtonState] = useState("");

    //on mount (empty dependencies [])
    useEffect(async () => {
        const { data } = await axios.get(`/api/friendstatus/${otherUser_id}`);
        setFriendStatus(data);
    }, [otherUser_id]);

    useEffect(async () => {
        console.log(
            "...(FriendButton: on buttonState change) buttonState: ",
            buttonState
        );
    }, [buttonState]);

    useEffect(() => {
        console.log(
            "...(FriendButton: on friendstatus change) friend_status: ",
            friend_status
        );
        if (friend_status.status == null) {
            setButtonState("request");
            return;
        }
        if (friend_status.status == "friends") {
            setButtonState("unfriend");
            return;
        }
        console.log(
            "sender_id, status: ",
            friend_status.status,
            friend_status.sender,
            otherUser_id
        );
        if (
            friend_status.status == "pending" &&
            friend_status.sender == otherUser_id
        ) {
            setButtonState("accept");
            return;
        } else {
            setButtonState("cancel");
            return;
        }
    }, [friend_status]);

    const onButtonClick = async () => {
        console.log("CLICK buttonState: ", buttonState);
        const { data } = await axios.post(
            `/api/friendrequest?action=${buttonState}&user2_id=${otherUser_id}`
        );
        console.log("...(FriendButton: onButtonClick) result: ", data);
    };

    return <button onClick={onButtonClick}>{buttonState}</button>;
}
