import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndPending,
    changeFriendpendingToggle,
} from "../actions";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import FriendButton from "./FriendButton";
import FriendPendingButton from "./FriendPendingButton";

export default function Friends() {
    //pull toggle from store state
    const friendpending_toggle = useSelector((state) => {
        return state.friendpending_toggle;
    });

    //pull friends and pending from store state
    const friendsAndPending = useSelector((state) => {
        return state.friendsAndPending;
    });

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
    const pending = useSelector((state) => {
        return (
            state.friendsAndPending && state.friendsAndPending.filter(isPending)
        );
    });

    const onButtonClick = () => {
        dispatch(changeFriendpendingToggle(friendpending_toggle));
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsAndPending(friendsAndPending));
        dispatch(changeFriendpendingToggle(friendpending_toggle));
    }, [dispatch]);

    useEffect(() => {
        console.log("pending/friends has changed!", pending, friends);
    }, [pending, friends]);

    return (
        <>
            <section className="customRadioBtn">
                <FriendPendingButton
                    friendpending_toggle={friendpending_toggle}
                    onButtonClick={onButtonClick}
                />
            </section>
            <section className="searchResults searchResults2">
                <ul>
                    {!friendpending_toggle &&
                        pending &&
                        pending.map((user) => {
                            return (
                                <li key={user.id}>
                                    <Link to={"/user/" + user.id}>
                                        <ProfilePic
                                            className="avatar"
                                            profile_url={user.profile_url}
                                        />
                                    </Link>
                                    <div className="">
                                        <Link to={"/user/" + user.id}>
                                            <h1>
                                                {user.first_name +
                                                    " " +
                                                    user.last_name}
                                            </h1>
                                        </Link>
                                    </div>
                                    <FriendButton
                                        smallButton="smallBtn"
                                        otherUser_id={user.id}
                                        onFriendStatusChange=""
                                    ></FriendButton>
                                </li>
                            );
                        })}
                    {friendpending_toggle &&
                        friends &&
                        friends.map((user) => {
                            return (
                                <li key={user.id}>
                                    <Link to={"/user/" + user.id}>
                                        <ProfilePic
                                            className="avatar"
                                            profile_url={user.profile_url}
                                        />
                                    </Link>
                                    <div className="">
                                        <Link to={"/user/" + user.id}>
                                            <h1>
                                                {user.first_name +
                                                    " " +
                                                    user.last_name}
                                            </h1>
                                        </Link>
                                    </div>
                                    <FriendButton
                                        smallButton="smallBtn"
                                        otherUser_id={user.id}
                                        onFriendStatusChange=""
                                    ></FriendButton>
                                </li>
                            );
                        })}
                </ul>
            </section>
        </>
    );
}
