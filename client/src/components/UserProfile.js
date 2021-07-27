import ProfileBanner from "./ProfileBanner";
import FriendButton from "./FriendButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    receiveOtherUser,
    receiveOtherUserFriends,
    toggleLightboxVisible,
    receivePhotoPickerGallery,
} from "../actions";
import { Redirect } from "react-router";
import FriendsList from "./FriendsList";
import LightBox from "./LightBox";
import ProfileDetails from "./ProfileDetails";
import HotPotatoButton from "./HotPotatoButton";

export default function UserProfile(props) {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const photos = useSelector((state) => {
        return state.photoPickerGallery;
    });
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
    useEffect(() => {
        dispatch(receivePhotoPickerGallery(userId));
    }, [userId]);

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
                        <div className="friendButtonsWrapper">
                            <FriendButton
                                onFriendStatusChange={setFriendStatus}
                                otherUser_id={otherUser.id}
                            ></FriendButton>
                            <HotPotatoButton user_id={otherUser.id} />
                        </div>
                        <ProfileDetails userId={userId} />
                    </div>
                    <FriendsList
                        otherUserFriends={otherUserFriends}
                        userId={userId}
                    />
                    {isLightboxVisible && (
                        <LightBox
                            user={otherUser}
                            toggleLightbox={toggleLightbox}
                            photos={photos}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
