//components
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import FriendPendingButton from "./FriendPendingButton";

//hoooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//redux
import {
    receiveFriendsAndPending,
    changeFriendpendingToggle,
    acceptFriendship,
    deleteFriendship,
    cancelRequest,
} from "../redux/action-creator";

export default function Friends() {
    const dispatch = useDispatch();
    //pull toggle from store state
    const friendpending_toggle = useSelector((state) => {
        return state.friendpending_toggle;
    });

    //Filter for friends & pending
    const isFriend = (friendOrPending) => {
        return friendOrPending.friend_status == "friends";
    };
    const isPending = (friendOrPending) => {
        return friendOrPending.friend_status == "pending";
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
        dispatch(receiveFriendsAndPending());
    };
    const onUnfriendButtonClick = (user_id) => {
        dispatch(deleteFriendship(user_id));
    };
    const onCancelButtonClick = (user_id) => {
        dispatch(cancelRequest(user_id));
    };
    const onAcceptButtonClick = (user_id) => {
        dispatch(acceptFriendship(user_id));
    };

    useEffect(() => {
        dispatch(receiveFriendsAndPending());
        dispatch(changeFriendpendingToggle(friendpending_toggle));
    }, [dispatch]);

    const renderList = (list) => {
        return list.map((user) => {
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
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                    </div>
                    {user.friend_status == "pending" &&
                        renderAcceptRejectButtons(user)}
                    {user.friend_status == "friends" &&
                        renderUnfriendButton(user)}
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
            <section className="searchResults friendsAndPendingList">
                <ul>
                    {friendpending_toggle
                        ? renderList(friends)
                        : renderList(pending)}
                </ul>
            </section>
        </>
    );

    function renderAcceptRejectButtons(user) {
        return (
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
                        {user.id == user.sender_id ? "accept" : "cancel"}
                    </span>

                    <span className="flex">
                        <i className="material-icons white">
                            {user.id == user.sender_id
                                ? "person_add"
                                : "person_add_disabled"}
                        </i>
                    </span>
                </button>

                {user.id == user.sender_id && (
                    <button
                        className="button submitButton tooltip"
                        onClick={() => onCancelButtonClick(user.id)}
                    >
                        <span className="tooltiptext">reject</span>

                        <span className="flex">
                            <i className="material-icons white">
                                person_remove
                            </i>
                        </span>
                    </button>
                )}
            </div>
        );
    }

    function renderUnfriendButton(user) {
        return (
            <div className="smallBtn">
                <button
                    className="button submitButton tooltip"
                    onClick={() => onUnfriendButtonClick(user.id)}
                >
                    <span className="tooltiptext">unfriend</span>

                    <span className="flex">
                        <i className="material-icons white">person_remove</i>
                    </span>
                </button>
            </div>
        );
    }
}
