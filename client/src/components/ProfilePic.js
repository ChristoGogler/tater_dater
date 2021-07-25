const DEFAULT_PROFILEPIC = "../img/default_profileImg.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleUploaderVisible } from "../actions";
export default function ProfilePic({ profile_url, className }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const fullName = user.first_name + " " + user.last_name;
    // console.log("ProfilePic url: ", profile_url);

    const showUploader = () => {
        dispatch(toggleUploaderVisible(true));
    };

    return (
        <div className="profilePicWrapper">
            <img
                className={className}
                src={profile_url || DEFAULT_PROFILEPIC}
                alt={fullName}
                onClick={showUploader}
            />
        </div>
    );
}
