import { Component } from "react";
import Logo from "./Logo";
import Logout from "./Logout";
import ProfilePic from "./ProfilePic";
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
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick() {
        // console.log("...(onLogoutClick");
        event.preventDefault();
        axios.post("/logout", this.props.user).then((result) => {
            // console.log(result);
            window.location = "/";
        });
    }

    onProfilePicClick() {
        console.log("...(onProfilePicClick)");
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
                        <Logo></Logo>

                        <Logout onClick={this.onLogoutClick}></Logout>
                        <ProfilePic
                            user={this.state.user}
                            onClick={this.onProfilePicClick}
                        ></ProfilePic>
                    </div>
                </header>
                <section>
                    <p>Hello {this.state.user.first_name}! Logged in!</p>
                </section>
            </section>
        );
    }
}
