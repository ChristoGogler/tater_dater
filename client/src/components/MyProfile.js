import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import ProfileBanner from "./ProfileBanner";

export default function MyProfile({
    first_name,
    last_name,
    bio,

    profile_url,
    onBioChange,
}) {
    return (
        <div className="profileWrapper">
            <ProfileBanner
                first_name={first_name}
                last_name={last_name}
                profile_url={profile_url}
                className="bigProfilePic"
            ></ProfileBanner>
            <div className="bioContent">
                <h1>{first_name + " " + last_name}</h1>
                <BioEditor bio={bio} onBioChange={onBioChange}></BioEditor>
            </div>
        </div>
    );
}
