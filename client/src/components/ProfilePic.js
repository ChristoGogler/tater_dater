const DEFAULT_PROFILEPIC = "../img/default_profileImg.png";
import { useSelector } from "react-redux";
export default function ProfilePic({ profile_url, className, showUploader }) {
    const user = useSelector((state) => state.user);
    const fullName = user.first_name + " " + user.last_name;

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
