import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndPending,
    stillLoading,
    toggleLightboxVisible,
} from "../actions";
import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import LightBox from "./LightBox";
// import FriendsList from "./FriendsList";

export default function MyProfile() {
    //pull friends and pending from store state
    // const friendsAndPending = useSelector((state) => {
    //     return state.friendsAndPending;
    // });
    const user = useSelector((state) => {
        return state.user;
    });
    const isLightboxVisible = useSelector((state) => state.isLightboxVisible);

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(stillLoading(true));
        dispatch(receiveFriendsAndPending());
        // dispatch(stillLoading(false));
    }, []);
    const toggleLightbox = () => {
        dispatch(toggleLightboxVisible(isLightboxVisible));
    };

    return (
        <div className="profileWrapper">
            <ProfileBanner
                first_name={user.first_name}
                last_name={user.last_name}
                profile_url={user.profile_url}
                className="bigProfilePic"
                showLightbox={toggleLightbox}
            ></ProfileBanner>

            <div className="bioContent">
                <h1>{user.first_name + " " + user.last_name}</h1>
                <BioEditor></BioEditor>
            </div>
            {isLightboxVisible && (
                <LightBox user={user} toggleLightbox={toggleLightbox} />
            )}

            {/* {friendsAndPending && <FriendsList></FriendsList>} */}
        </div>
    );
}
