const DEFAULT_PROFILEPIC = "../img/default_profileImg.png";

export default function ProfilePic({
    first_name,
    last_name,
    profile_url,
    showUploader,
    className,
}) {
    const fullName = first_name + " " + last_name;
    // console.log("ProfilePic url: ", profile_url);
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
