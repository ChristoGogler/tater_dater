import { Component } from "react";
import axios from "../axios";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";

import Chat from "./Chat";
import FindProfile from "./FindProfile";
import Footer from "./Footer";
import Friends from "./Friends_redux";
import Logo from "./Logo";
import Logout from "./Logout";
import MyProfile from "./MyProfile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import UserProfile from "./UserProfile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            bio: null,
            profile_url: null,
            loading: true,

            message: "",
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
    onUpload({ profile_url }) {
        this.setState({
            profile_url,
        });
    }

    //TODO
    async onLogoutClick() {
        event.preventDefault();
        await axios.post("/api/logout", this.props.user);
        location.reload();
    }
    onBioChange(user) {
        console.log("App onBioChange");

        this.setState(user);
    }
    async componentDidMount() {
        try {
            const user = await axios.get("/api/user");
            this.setState({
                first_name: user.data.first_name,
                last_name: user.data.last_name,
                bio: user.data.bio,
                profile_url: user.data.profile_url,
            });
            this.setState({ loading: false });
        } catch (error) {
            this.state.message = "Error logging in: " + error;
            console.log("Error logging in: ", error);
            this.onLogoutClick();
        }
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
                    <nav>
                        <div>
                            <Link to="/friends/list">
                                <button>
                                    <i className="material-icons">group</i>
                                    <span className="hideLabel">
                                        My Friends
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/users/find">
                                <button>
                                    <i className="material-icons">group_add</i>
                                    <span className="hideLabel">
                                        Find Friends
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/chat">
                                <button>
                                    <i className="material-icons">
                                        question_answer
                                    </i>
                                    <span className="hideLabel">Chat</span>
                                </button>
                            </Link>
                        </div>
                        <Logout onClick={this.onLogoutClick}></Logout>
                        {!this.state.loading && (
                            <ProfilePic
                                profile_url={this.state.profile_url}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                showUploader={this.showUploader}
                                className="avatar smallProfilePic"
                            />
                        )}
                    </nav>
                    <section className="mainContent vcenter">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <MyProfile
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        bio={this.state.bio}
                                        profile_url={this.state.profile_url}
                                        onBioChange={this.onBioChange}
                                        loading={this.state.loading}
                                    />
                                )}
                            />
                            <Route path="/friends/list" component={Friends} />
                            <Route path="/users/find" component={FindProfile} />
                            <Route path="/user/:id" component={UserProfile} />
                            <Route path="/chat" component={Chat} />
                            <Route path="/">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                        <section className="modal">
                            {this.state.isUploaderVisible && (
                                <Uploader
                                    hideUploader={this.hideUploader}
                                    onUpload={this.onUpload}
                                />
                            )}
                        </section>
                    </section>
                    <Footer />
                </>
            </BrowserRouter>
        );
    }
}
