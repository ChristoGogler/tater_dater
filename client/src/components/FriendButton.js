import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ user1_id }) {
    //4 states of the button: request, accept, cancel, unfriend
    const [friend_status, setFriendStatus] = useState("");

    //on mount (empty dependencies [])
    useEffect(async () => {
        console.log("...(FriendButton: on mount) user1_id: ", user1_id);

        const { data } = await axios.get(`/api/friendstatus/${user1_id}`);
        console.log("...(FriendButton: on mount) friendstatus: ", data);
        // setFriendStatus(data);
    }, [user1_id]);

    return <button>Button</button>;
}
