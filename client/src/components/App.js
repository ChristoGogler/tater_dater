import { Component } from "react";
import Logo from "./Logo";
import Logout from "./Logout";
import MyProfile from "./MyProfile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import UserProfile from "./UserProfile";
import Footer from "./Footer";
import axios from "../axios";
import { BrowserRouter, Link, Route } from "react-router-dom";
import FindProfile from "./FindProfile";

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
        console.log("onUpload user: ", user);
        this.setState({
            profile_url: user.profile_url,
        });
    }

    //TODO
    onLogoutClick() {
        event.preventDefault();
        axios.post("/api/logout", this.props.user).then((result) => {
            window.location = "/";
        });
    }
    onBioChange(user) {
        console.log("App onBioChange");

        this.setState(user);
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
            <BrowserRouter>
                <>
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </header>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <MyProfile
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                id={this.state.id}
                                bio={this.state.bio}
                                profile_url={this.state.profile_url}
                                email={this.state.email}
                                onBioChange={this.onBioChange}
                            />
                        )}
                    />
                    <Route path="/user/:id" component={UserProfile} />
                    <Route path="/users/find" component={FindProfile} />
                    <nav>
                        <Logout onClick={this.onLogoutClick}></Logout>
                        <div>
                            <Link to="/users/find">
                                <button>
                                    <i className="material-icons">group_add</i>
                                </button>
                            </Link>
                        </div>
                        <ProfilePic
                            profile_url={this.state.profile_url}
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            showUploader={this.showUploader}
                            className="avatar smallProfilePic"
                        />
                    </nav>
                    <section className="modal">
                        {this.state.isUploaderVisible && (
                            <Uploader
                                hideUploader={this.hideUploader}
                                onUpload={this.onUpload}
                            />
                        )}
                    </section>
                    <Footer />
                </>
            </BrowserRouter>
        );
    }
}
