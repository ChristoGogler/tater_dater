import { Component } from "react";
const DEFAULT_PROFILEPIC = "./img/default_profileImg.png";

export default function ProfilePic({ user, onClick }) {
    console.log("profilePic", user, onClick);
    const fullName = user.first_name + " " + user.last_name;
    return (
        <div className="profilePicComponent">
            <img
                className="profilePic"
                src={user.profile_url || DEFAULT_PROFILEPIC}
                alt={fullName}
                onClick={onClick}
            />
        </div>
    );
}
