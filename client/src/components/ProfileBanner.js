const DEFAULT_PROFILEPIC = "../img/default_profileImg.png";

export default function ProfileBanner({
    first_name,
    last_name,
    profile_url,
    showLightbox,
    className,
}) {
    return (
        <div className="profileBannerWrapper">
            <img
                className={className}
                src={profile_url || DEFAULT_PROFILEPIC}
                alt={first_name + " " + last_name}
                onClick={showLightbox}
            />
        </div>
    );
}
