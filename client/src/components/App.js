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
        });
    }
    render() {
        // console.log("render: ", this.state.user);
        return (
            <section>
                <header>
                    <div>
                        <Logo logo={this.state.logo}></Logo>

                        <Logout onClick={this.onLogoutClick}></Logout>
                        <ProfilePic
                            user={this.state.user}
                            showUploader={this.showUploader}
                        ></ProfilePic>
                    </div>
                </header>
                <section>
                    <p>Hello {this.state.user.first_name}! Logged in!</p>
                    {this.state.isUploaderVisible && (
                        <Uploader hideUploader={this.hideUploader} />
                    )}
                </section>
            </section>
        );
    }
}
