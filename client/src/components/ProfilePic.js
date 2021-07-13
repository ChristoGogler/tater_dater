const DEFAULT_PROFILEPIC = "./img/default_profileImg.png";

export default function ProfilePic({ user, showUploader }) {
    const fullName = user.first_name + " " + user.last_name;
    console.log("ProfilePic user: ", user);
    return (
        <div className="profilePicComponent">
            <img
                className="profilePic"
                src={user.profile_url || DEFAULT_PROFILEPIC}
                alt={fullName}
                onClick={showUploader}
            />
        </div>
    );
}
