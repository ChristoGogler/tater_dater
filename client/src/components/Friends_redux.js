import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndPending,
    changeFriendpendingToggle,
    acceptFriendship,
    deleteFriendship,
    cancelRequest,
} from "../actions";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
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
    const dispatch = useDispatch();
    const onButtonClick = () => {
        dispatch(changeFriendpendingToggle(friendpending_toggle));
        dispatch(receiveFriendsAndPending(friendsAndPending));
    };
    const onUnfriendButtonClick = (user_id) => {
        console.log("unfriend click");
        dispatch(deleteFriendship(user_id));
    };
    const onCancelButtonClick = (user_id) => {
        console.log("cancel click");
        dispatch(cancelRequest(user_id));
    };
    const onAcceptButtonClick = (user_id) => {
        console.log("accept click");
        dispatch(acceptFriendship(user_id));
    };

    useEffect(() => {
        dispatch(receiveFriendsAndPending(friendsAndPending));
        dispatch(changeFriendpendingToggle(friendpending_toggle));
    }, [dispatch]);

    useEffect(() => {
        console.log("pending/friends has changed!", pending, friends);
    }, [pending, friends]);

    const renderFriends = () => {
        return friends.map((user) => {
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
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                    </div>
                    <div className="smallBtn">
                        <button
                            className="button submitButton tooltip"
                            onClick={() => onUnfriendButtonClick(user.id)}
                        >
                            <span className="tooltiptext">unfriend</span>

                            <span className="flex">
                                <i className="material-icons white">
                                    person_remove
                                </i>
                            </span>
                        </button>
                    </div>
                </li>
            );
        });
    };

    const renderPending = () => {
        return pending.map((user) => {
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
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                    </div>
                    <div className="smallBtn">
                        <button
                            className="button submitButton tooltip"
                            onClick={
                                user.id == user.sender_id
                                    ? () => onAcceptButtonClick(user.id)
                                    : () => onCancelButtonClick(user.id)
                            }
                        >
                            <span className="tooltiptext">
                                {user.id == user.sender_id
                                    ? "accept"
                                    : "cancel"}
                            </span>

                            <span className="flex">
                                <i className="material-icons white">
                                    {user.id == user.sender_id
                                        ? "person_add"
                                        : "person_add_disabled"}
                                </i>
                            </span>
                        </button>
                    </div>
                </li>
            );
        });
    };

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
                    {!friendpending_toggle && pending && renderPending()}
                    {friendpending_toggle && friends && renderFriends()}
                </ul>
            </section>
        </>
    );
}