import { Component } from "react";
// import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";
import FriendButton from "./FriendButton";
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
            noUserFound: false,
            isLightboxVisible: false,
            isFriend: "",
        };

        // bind methods here!
        this.showLightbox = this.showLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.onFriendStatusChange = this.onFriendStatusChange.bind(this);
        this.setFriendStatus = this.setFriendStatus.bind(this);
    }
    showLightbox() {
        // console.log("...(UserProfile: showLightbox) CLICK");
        this.setState({
            isLightboxVisible: true,
        });
    }
    closeLightbox() {
        // console.log("...(UserProfile: closeLightbox) CLICK");

        this.setState({
            isLightboxVisible: false,
        });
    }
    onFriendStatusChange(status) {
        // console.log(" new friendstatus", status);
        this.setState({
            isFriend: status,
        });
        const userId = this.props.match.params.id;
        this.setFriendStatus(userId);
    }

    async setFriendStatus(userId) {
        const { data } = await axios.get(`/api/friendstatus/${userId}`);
        this.setState({ isFriend: data.status });
    }
    async componentDidMount() {
        console.log("...(UserProfile: componentDidMount)");
        // get id from url --> this.props.match.params.id
        const userId = this.props.match.params.id;
        const otherUser = await axios.get(`/api/user/${userId}`);
        this.setFriendStatus(userId);
        if (otherUser.data.self) {
            this.props.history.push("/");
            return;
        }
        if (otherUser.data == null) {
            this.setState({
                first_name: "Patty",
                last_name: "Potato",
                bio: "Hej, Im Patty Potato! Were you looking for me? 404",
            });
        }
        this.setState(otherUser.data);
        console.log("STATE: ", this.state.id);
    }
    render() {
        const { first_name, last_name, email, bio, id, profile_url } =
            this.state;

        return (
            <div className="profileWrapper">
                <ProfileBanner
                    first_name={first_name}
                    last_name={last_name}
                    profile_url={profile_url}
                    showLightbox={this.showLightbox}
                    className="bigProfilePic"
                />

                <div className="bioContent">
                    <h1 className="username">
                        {first_name + " " + last_name}{" "}
                        {this.state.isFriend == "friends" && (
                            <span className="friendStatusLabel">
                                <i className="material-icons">people</i>
                                (friend)
                            </span>
                        )}
                        {this.state.isFriend == "pending" && (
                            <span className="friendStatusLabel">
                                (pending friend request)
                            </span>
                        )}
                    </h1>

                    <p className="userbio"> {bio}</p>
                    <FriendButton
                        onFriendStatusChange={this.onFriendStatusChange}
                        otherUser_id={this.state.id}
                    ></FriendButton>
                </div>

                {this.state.isLightboxVisible && (
                    <section className="backdrop" onClick={this.closeLightbox}>
                        <div className="lightbox">
                            <img
                                src={profile_url}
                                alt={first_name + " " + last_name}
                                onClick={(event) => event.stopPropagation()}
                            ></img>
                        </div>
                    </section>
                )}
            </div>
        );
    }
}
