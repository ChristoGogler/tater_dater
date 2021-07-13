import { Component } from "react";
import Logo from "./Logo";
import Logout from "./Logout";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "../axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: null,
                last_name: null,
                id: null,
                profile_url: null,
                email: null,
            },
            logo: "./img/logo.png",
            isUploaderVisible: false,
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.onUpload = this.onUpload.bind(this);
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
    onLogoutClick() {
        event.preventDefault();
        axios.post("/logout", this.props.user).then((result) => {
            window.location = "/";
        });
    }
    componentDidMount() {
        axios.get("/api/user").then((user) => {
            // console.log("...(componentDidMount): ", user.data);
            this.setState({
                user: user.data,
            });
            console.log("this.state: ", this.state);
        });
    }
    render() {
        return (
            <section>
                <header>
                    <Logo logo={this.state.logo}></Logo>
                    <ProfilePic
                        className="smallProfile"
                        user={this.state.user}
                        showUploader={this.showUploader}
                    ></ProfilePic>
                </header>
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
