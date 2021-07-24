import ProfileBanner from "./ProfileBanner";
import FriendButton from "./FriendButton";
import { useState, useEffect } from "react";
import axios from "../axios";

export default function UserProfile(props) {
    const [otherUser, setOtherUser] = useState({});
    const [isLightboxVisible, setIsLightboxVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showLightbox = () => {
        setIsLightboxVisible(true);
    };
    const closeLightbox = () => {
        setIsLightboxVisible(false);
    };
    const onFriendStatusChange = () => {
        const userId = props.match.params.id;
        setFriendStatus(userId);
    };

    const setFriendStatus = async (userId) => {
        try {
            const { data } = await axios.get(`/api/friendstatus/${userId}`);
            return { isFriend: data.status };
        } catch (error) {
            setMessage({
                message:
                    "Problem getting your friendship status with this person.",
            });
            console.log("ERROR getting friendship status: ", error);
        }
    };
    useEffect(async () => {
        const userId = props.match.params.id;
        let updatedUser;
        try {
            updatedUser = await axios.get(`/api/user/${userId}`);
            const status = await setFriendStatus(userId);
            if (updatedUser.data.self) {
                //redirect to myprofile if trying to open otherUser profile with own id
                location.redirect("/");
                return;
            }
            setOtherUser({ ...updatedUser.data, ...status });
        } catch (error) {
            console.log("ERROR getting user id:", error);
            updatedUser = { data: null };
        }
    }, []);

    const { first_name, last_name, email, bio, id, profile_url, isFriend } =
        otherUser;

    return (
        <div className="profileWrapper">
            <ProfileBanner
                first_name={first_name}
                last_name={last_name}
                profile_url={profile_url}
                showLightbox={showLightbox}
                className="bigProfilePic"
            />

            <div className="bioContent">
                <h1 className="username">
                    {first_name + " " + last_name}{" "}
                    {isFriend == "friends" && (
                        <span className="friendStatusLabel">
                            <i className="material-icons">people</i>
                            (friend)
                        </span>
                    )}
                    {isFriend == "pending" && (
                        <span className="friendStatusLabel">
                            (pending friend request)
                        </span>
                    )}
                </h1>

                <p className="userbio"> {bio}</p>
                <FriendButton
                    onFriendStatusChange={onFriendStatusChange}
                    otherUser_id={otherUser.id}
                ></FriendButton>
            </div>

            {isLightboxVisible && (
                <section className="backdrop" onClick={closeLightbox}>
                    <div className="lightbox">
                        <img
                            src={profile_url}
                            alt={first_name + " " + last_name}
                            onClick={(event) => event.stopPropagation()}
                        ></img>
                    </div>
                </section>
            )}
        </div>
    );
}
