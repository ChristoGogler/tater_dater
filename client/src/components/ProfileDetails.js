//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { receiveUserprofile } from "../redux/action-creator";

export default function ProfileDetails(props) {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);

    useEffect(() => {
        dispatch(receiveUserprofile(props.userId));
    }, [props.userId]);

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
        </div>
    );
}
