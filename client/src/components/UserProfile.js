import { Component } from "react";
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
            message: "",
        };

        // bind methods here!
        this.showLightbox = this.showLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.onFriendStatusChange = this.onFriendStatusChange.bind(this);
        this.setFriendStatus = this.setFriendStatus.bind(this);
    }
    showLightbox() {
        this.setState({
            isLightboxVisible: true,
        });
    }
    closeLightbox() {
        this.setState({
            isLightboxVisible: false,
        });
    }
    onFriendStatusChange(status) {
        const userId = this.props.match.params.id;
        this.setState({
            isFriend: status,
        });
        this.setFriendStatus(userId);
    }

    async setFriendStatus(userId) {
        try {
            const { data } = await axios.get(`/api/friendstatus/${userId}`);
            this.setState({ isFriend: data.status });
        } catch (error) {
            this.setState({
                message:
                    "Problem getting your friendship status with this person.",
            });
            console.log("ERROR getting friendship status: ", error);
        }
    }
    async componentDidMount() {
        const userId = this.props.match.params.id;
        let otherUser;
        try {
            otherUser = await axios.get(`/api/user/${userId}`);
        } catch (error) {
            console.log("ERROR getting user id:", error);
            otherUser = { data: null };
        }
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
