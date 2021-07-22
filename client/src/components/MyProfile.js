import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveFriendsAndPending } from "../actions";

import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import FriendsList from "./FriendsList";

export default function MyProfile({
    first_name,
    last_name,
    bio,
    loading,
    profile_url,
    onBioChange,
}) {
    //pull friends and pending from store state
    const friendsAndPending = useSelector((state) => {
        return state.friendsAndPending;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(receiveFriendsAndPending(friendsAndPending));
    }, [dispatch]);

    return (
        <div className="profileWrapper">
            <ProfileBanner
                first_name={first_name}
                last_name={last_name}
                profile_url={profile_url}
                className="bigProfilePic"
            ></ProfileBanner>

            <div className="bioContent">
                <h1>{first_name + " " + last_name}</h1>
                <BioEditor bio={bio} onBioChange={onBioChange}></BioEditor>
            </div>

            {/* {friendsAndPending && <FriendsList></FriendsList>} */}
        </div>
    );
}
