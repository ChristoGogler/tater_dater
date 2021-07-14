import { Component } from "react";
import Logo from "./Logo";
import Logout from "./Logout";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "../axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            id: null,
            bio: null,
            profile_url: null,
            email: null,

            logo: "./img/logo.png",
            isUploaderVisible: false,
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioChange = this.onBioChange.bind(this);
    }

    showUploader() {
        console.log("show Uploader");
        this.setState({
            isUploaderVisible: true,
        });
    }
    hideUploader() {
        console.log("hide Uploader");
        this.setState({
            isUploaderVisible: false,
        });
    }
    onUpload(user) {
        // set the state accordingly
        console.log("onUpload user: ", user);
        this.setState({
            user: user,
        });
    }

    //TODO
    onLogoutClick() {
        event.preventDefault();
        axios.post("/api/logout", this.props.user).then((result) => {
            window.location = "/";
        });
    }
    onBioChange(newBio) {
        console.log("App onBioChange", newBio);
        // console.log("this.state: ", this.state);
        axios.put("/api/user/update/bio", { bio: newBio }).then((user) => {
            console.log("...(App onBioChange) result: ", user);

            this.setState({
                first_name: user.data.first_name,
                last_name: user.data.last_name,
                id: user.data.id,
                bio: user.data.bio,
                profile_url: user.data.profile_url,
                email: user.data.email,
            });
        });
    }
    componentDidMount() {
        axios.get("/api/user").then((user) => {
            console.log("...(App: componentDidMount): ", user.data);
            this.setState({
                first_name: user.data.first_name,
                last_name: user.data.last_name,
                id: user.data.id,
                bio: user.data.bio,
                profile_url: user.data.profile_url,
                email: user.data.email,
            });
            // console.log("this.state: ", this.state);
        });
    }
    render() {
        return (
            <section>
                <header>
                    <Logo logo={this.state.logo}></Logo>
                    <ProfilePic
                        user={this.state.user}
                        showUploader={this.showUploader}
                        className="smallProfilePic"
                    ></ProfilePic>
                </header>
                <section>
                    <Profile
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                        id={this.state.id}
                        bio={this.state.bio}
                        profile_url={this.state.profile_url}
                        email={this.state.email}
                        onBioChange={this.onBioChange}
                    ></Profile>
                </section>
                <nav>
                    <Logout onClick={this.onLogoutClick}></Logout>
                </nav>
                <section className="modal">
                    {this.state.isUploaderVisible && (
                        <Uploader
                            hideUploader={this.hideUploader}
                            onUpload={this.onUpload}
                        />
                    )}
                </section>
            </section>
        );
    }
}
