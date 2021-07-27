import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveUserprofile } from "../actions";
import UserProfile from "./UserProfile";

export default function ProfileDetails(props) {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);
    console.log("...(ProfileDetails) userProfile: ", userProfile);
    useEffect(() => {
        dispatch(receiveUserprofile(props.userId));
    }, []);

    return (
        <div>
            {userProfile && (
                <>
                    <h1>Profile Details</h1>
                    <p>
                        <span className="bolder">I am:</span>{" "}
                        {userProfile.about_me}
                    </p>

                    <p>
                        <span className="bolder">Living in:</span>{" "}
                        {userProfile.city}
                    </p>
                    <p>
                        <span className="bolder">Likes:</span>{" "}
                        {userProfile.likes}
                    </p>
                    <p>
                        <span className="bolder">Dislikes :</span>{" "}
                        {userProfile.dislikes}
                    </p>
                    <h1>Looking for</h1>
                    <p>
                        <span className="bolder">Interested in: </span>
                        {userProfile.interested_in}
                    </p>
                    <p>
                        <span className="bolder">Gender:</span>{" "}
                        {userProfile.gender}
                    </p>
                    <p>
                        <span className="bolder">Orientation:</span>{" "}
                        {userProfile.orientation}
                    </p>
                </>
            )}
            {userProfile == null && (
                <>
                    <h1>Profile Details</h1>
                    <p>
                        <span className="bolder">I am:</span> ...like a potato -
                        ugly on the outside, yummy in the middle!
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
                        <span className="bolder">Gender:</span> male, female,
                        non-binary, diverse
                    </p>
                    <p>
                        <span className="bolder">Orientation:</span> queer,
                        yamsexual
                    </p>
                </>
            )}
        </div>
    );
}
