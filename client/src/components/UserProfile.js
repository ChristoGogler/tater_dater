import { Component } from "react";
import axios from "../axios";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            bio: "",
            id: "",
            profile_url: "",
        };

        // bind methods here!
    }
    componentDidMount() {
        console.log("...(UserProfile: componentDidMount)");
    }
    render() {
        return (
            <div className="profileWrapper">
                <ProfilePic
                    first_name={first_name}
                    last_name={last_name}
                    profile_url={profile_url}
                    className="bigProfilePic"
                ></ProfilePic>
            </div>
        );
    }
}
