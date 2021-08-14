//components
import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import ProfileDetails from "./ProfileDetails";
import LightBox from "./LightBox";

//hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//redux
import {
    receiveFriendsAndPending,
    toggleLightboxVisible,
    receivePhotoPickerGallery,
} from "../redux/action-creator";

export default function MyProfile() {
    const user = useSelector((state) => {
        return state.user;
    });
    const photos = useSelector((state) => {
        return state.photoPickerGallery;
    });
    const isLightboxVisible = useSelector((state) => state.isLightboxVisible);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(receiveFriendsAndPending());
    }, []);
    useEffect(() => {
        if (user.id) {
            dispatch(receivePhotoPickerGallery(user.id));
        }
    }, [user]);

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
                <ProfileDetails userId={user.id} />
            </div>

            {isLightboxVisible && photos && (
                <LightBox
                    user={user}
                    toggleLightbox={toggleLightbox}
                    photos={photos}
                />
            )}
        </div>
    );
}
