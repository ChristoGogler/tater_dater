import { Component } from "react";
import ProfilePic from "./ProfilePic";
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
    async componentDidMount() {
        console.log("...(UserProfile: componentDidMount)");
        // get id from url --> this.props.match.params.id
        const userId = this.props.match.params.id;
        const otherUser = await axios.get(`/api/user/${userId}`);
        console.log(
            "...(UserProfile: componentDidMount) otherUser: ",
            otherUser.data
        );
        this.setState(otherUser.data);
        console.log("STATE: ", this.state);
    }
    render() {
        const { first_name, last_name, email, bio, id, profile_url } =
            this.state;

        return (
            <div className="profileWrapper">
                <ProfilePic
                    first_name={first_name}
                    last_name={last_name}
                    profile_url={profile_url}
                    bio={bio}
                    className="bigProfilePic"
                ></ProfilePic>
                <div className="bioContent">
                    <h1>Bio</h1>
                    <p>{bio}</p>
                </div>
            </div>
        );
    }
}
