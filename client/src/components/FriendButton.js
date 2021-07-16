import { request } from "express";
import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ user1_id: otherUser_id }) {
    //4 states of the button: request, accept, cancel, unfriend
    //3 states of friendship: null, pending, friends
    const [friend_status, setFriendStatus] = useState("");
    const [buttonState, setButtonState] = useState("");

    //on mount (empty dependencies [])
    useEffect(async () => {
        console.log("...(FriendButton: on mount) user1_id: ", otherUser_id);

        const { data } = await axios.get(`/api/friendstatus/${otherUser_id}`);
        console.log("...(FriendButton: on mount) friendstatus: ", data);
        setFriendStatus(data);
    }, [otherUser_id]);

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
        if (
            friend_status.status == "pending" &&
            friend_status.sender_id == otherUser_id
        ) {
            setButtonState("accept");
            return;
        } else {
            setButtonState("cancel");
            return;
        }
    }, [friend_status]);

    return <button>Button</button>;
}
