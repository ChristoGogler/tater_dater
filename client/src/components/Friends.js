import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveFriendsAndPending } from "../actions";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";

export default function Friends() {
    //pull friends and pending from store state
    const friendsAndPending = useSelector((state) => {
        return state.friendsAndPending;
    });
    console.log("...(FRIENDS) friendsAndPending: ", friendsAndPending);
    //Filter for friends & pending
    const isFriend = (value) => {
        return value.friend_status == "friends";
    };
    const isPending = (value) => {
        return value.friend_status == "pending";
    };

    //separate friends from pending requests
    const friends = useSelector((state) => {
        return (
            state.friendsAndPending && state.friendsAndPending.filter(isFriend)
        );
    });
    // console.log("...(FRIENDS) friends: ", friends);

    const pending = useSelector((state) => {
        return (
            state.friendsAndPending && state.friendsAndPending.filter(isPending)
        );
    });
    // console.log("...(FRIENDS) pending: ", pending);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsAndPending(friendsAndPending));
    }, [dispatch]);

    useEffect(() => {
        console.log("pending/friends has changed!", pending, friends);
    }, [pending, friends]);

    return (
        <div>
            <p>FRIENDS LIST</p>
            <ul>
                {pending &&
                    pending.map((user) => {
                        return (
                            <li key={user.id}>
                                <Link to={"/user/" + user.id}>
                                    <ProfilePic
                                        className="avatar"
                                        profile_url={user.profile_url}
                                    />
                                </Link>
                                <div className="searchResultDetails">
                                    <Link to={"/user/" + user.id}>
                                        <h1>
                                            {user.first_name +
                                                " " +
                                                user.last_name}
                                        </h1>
                                    </Link>
                                    <p>{user.bio}</p>
                                </div>
                                {/* <FriendButton
                                    smallButton="smallBtn"
                                    otherUser_id={user.id}
                                    onFriendStatusChange=""
                                ></FriendButton> */}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
