import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveFriendsAndPending } from "../actions";

import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import FriendsList from "./FriendsList";

export default function MyProfile() {
    //pull friends and pending from store state
    const friendsAndPending = useSelector((state) => {
        return state.friendsAndPending;
    });
    const user = useSelector((state) => {
        return state.user;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(receiveFriendsAndPending(friendsAndPending));
    }, [dispatch]);

    return (
        <div className="profileWrapper">
            <ProfileBanner
                first_name={user.first_name}
                last_name={user.last_name}
                profile_url={user.profile_url}
                className="bigProfilePic"
            ></ProfileBanner>

            <div className="bioContent">
                <h1>{user.first_name + " " + user.last_name}</h1>
                <BioEditor></BioEditor>
            </div>

            {/* {friendsAndPending && <FriendsList></FriendsList>} */}
        </div>
    );
}
