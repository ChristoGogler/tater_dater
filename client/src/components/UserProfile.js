import ProfileBanner from "./ProfileBanner";
import FriendButton from "./FriendButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    receiveOtherUser,
    receiveOtherUserFriends,
    toggleLightboxVisible,
} from "../actions";
import { Redirect } from "react-router";
import FriendsList from "./FriendsList";

export default function UserProfile(props) {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const otherUser = useSelector((state) => {
        return state.otherUser;
    });
    const otherUserFriends = useSelector((state) => {
        return state.otherUserFriends;
    });
    const isLightboxVisible = useSelector((state) => state.isLightboxVisible);

    const setFriendStatus = async () => {
        dispatch(receiveOtherUser(userId));
    };

    const toggleLightbox = () => {
        dispatch(toggleLightboxVisible(isLightboxVisible));
    };

    useEffect(async () => {
        await dispatch(receiveOtherUser(userId));
        await dispatch(receiveOtherUserFriends(userId));
    }, []);

    return (
        <div>
            {otherUser.self && <Redirect to="/" />}
            {otherUser && otherUser.friendship && (
                <div className="profileWrapper">
                    <ProfileBanner
                        first_name={otherUser.first_name}
                        last_name={otherUser.last_name}
                        profile_url={otherUser.profile_url}
                        showLightbox={toggleLightbox}
                        className="bigProfilePic"
                    />
                    <div className="bioContent">
                        <h1 className="username">
                            {otherUser.first_name + " " + otherUser.last_name}{" "}
                            {otherUser.friendship.friend_status ==
                                "friends" && (
                                <span className="friendStatusLabel">
                                    <i className="material-icons">people</i>
                                    (friend)
                                </span>
                            )}
                            {otherUser.friendship.friend_status ==
                                "pending" && (
                                <span className="friendStatusLabel">
                                    (pending friend request)
                                </span>
                            )}
                        </h1>

                        <p className="userbio"> {otherUser.bio}</p>
                        <FriendButton
                            onFriendStatusChange={setFriendStatus}
                            otherUser_id={otherUser.id}
                        ></FriendButton>
                    </div>
                    <FriendsList
                        otherUserFriends={otherUserFriends}
                        userId={userId}
                    />
                    {isLightboxVisible && (
                        <section className="backdrop" onClick={toggleLightbox}>
                            <button className="closeButton">×</button>
                            <div className="lightbox">
                                <img
                                    src={otherUser.profile_url}
                                    alt={
                                        otherUser.first_name +
                                        " " +
                                        otherUser.last_name
                                    }
                                    onClick={(event) => event.stopPropagation()}
                                ></img>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
