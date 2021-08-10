import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndPending,
    toggleLightboxVisible,
    receivePhotoPickerGallery,
} from "../redux/action-creator";
import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";
import ProfileDetails from "./ProfileDetails";
import LightBox from "./LightBox";

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
        dispatch(receivePhotoPickerGallery(user.id));
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
                {/* <ProfileDetails userId={user.id} /> */}
                <div>
                    <>
                        <h1>Profile Details</h1>
                        <p>
                            <span className="bolder">I am:</span> ...like a
                            potato - ugly on the outside, yummy in the middle!
                        </p>
                        <p>
                            <span className="bolder">Living in:</span>{" "}
                            Mühlenbeck-Mönchmühle
                        </p>
                        <p>
                            <span className="bolder">Likes:</span> Big Potatoes,
                            Sweet Potatoes
                        </p>
                        <p>
                            <span className="bolder">Dislikes :</span> Anything
                            that's not potatoes!
                        </p>
                        <h1>Looking for</h1>
                        <p>
                            <span className="bolder">Interested in: </span>
                            Friends, Dates, Potato Pals
                        </p>
                        <p>
                            <span className="bolder">Gender:</span> male,
                            female, non-binary, diverse
                        </p>
                        <p>
                            <span className="bolder">Orientation:</span> queer,
                            yamsexual
                        </p>
                    </>
                </div>
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
