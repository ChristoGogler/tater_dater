import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    getMutualfriends,
    receiveOtherUser,
    receiveOtherUserFriends,
} from "../redux/action-creator";
import ProfilePic from "./ProfilePic";

import { Link } from "react-router-dom";

export default function FriendsList(props) {
    // console.log("props: ", props);
    const dispatch = useDispatch();

    //Filter for friends
    const isFriend = (value) => {
        return value.friend_status == "friends";
    };

    const mutualFriends = useSelector((state) => {
        return state.mutualFriends;
    });
    const myFriends = useSelector((state) => {
        return (
            state.friendsAndPending && state.friendsAndPending.filter(isFriend)
        );
    });
    const yourFriends = useSelector((state) => state.otherUserFriends);

    useEffect(() => {
        if (yourFriends.length > 0 && myFriends.length > 0) {
            dispatch(getMutualfriends(myFriends, yourFriends));
            return;
        }
    }, [yourFriends]);

    useEffect(async () => {
        // console.log(props);
        await dispatch(receiveOtherUser(props.userId));
        await dispatch(receiveOtherUserFriends(props.userId));
    }, [props.userId]);

    const renderResults = () => {
        return mutualFriends.map((user) => {
            return (
                <li key={user.id}>
                    <ProfilePic
                        profile_url={user.profile_url}
                        className="avatar miniAvatar"
                    ></ProfilePic>
                    <div className="searchResultDetails">
                        <Link to={`/user/${user.id}`}>
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                    </div>
                </li>
            );
        });
    };

    return (
        <div className="mutualFriendsList">
            {mutualFriends.length > 0 && (
                <p>
                    <span className="bolder">
                        {mutualFriends.length} mutual friends:
                    </span>
                </p>
            )}
            <ul>{mutualFriends.length > 0 && renderResults()}</ul>
        </div>
    );
}
