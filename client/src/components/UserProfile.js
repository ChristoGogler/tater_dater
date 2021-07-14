import { Component } from "react";
// import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";
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
        };

        // bind methods here!
        this.showLightbox = this.showLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }
    showLightbox() {
        console.log("...(UserProfile: showLightbox) CLICK");
        this.setState({
            isLightboxVisible: true,
        });
    }
    closeLightbox() {
        console.log("...(UserProfile: closeLightbox) CLICK");

        this.setState({
            isLightboxVisible: false,
        });
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
        if (otherUser.data == null) {
            this.setState({
                noUserFound: true,
                first_name: "Patty",
                last_name: "Potato",
                bio: "Hej, Im Patty Potato! You were looking for me? 404",
            });
        }
        this.setState(otherUser.data);
        console.log("STATE: ", this.state);
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
                    <h1 className="username">{first_name + " " + last_name}</h1>
                    <p className="userbio"> {bio}</p>
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
