import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function MyProfile({
    first_name,
    last_name,
    email,
    bio,
    id,
    profile_url,
    onBioChange,
}) {
    return (
        <div className="profileWrapper">
            <ProfilePic
                first_name={first_name}
                last_name={last_name}
                profile_url={profile_url}
                className="bigProfilePic"
            ></ProfilePic>
            <BioEditor bio={bio} onBioChange={onBioChange}></BioEditor>
        </div>
    );
}
