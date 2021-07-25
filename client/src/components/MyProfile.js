import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveFriendsAndPending, toggleLightboxVisible } from "../actions";
import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import LightBox from "./LightBox";

export default function MyProfile() {
    const user = useSelector((state) => {
        return state.user;
    });
    const isLightboxVisible = useSelector((state) => state.isLightboxVisible);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(receiveFriendsAndPending());
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
        </div>
    );
}
