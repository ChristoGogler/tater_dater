import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { getUser, toggleUploaderVisible, updateProfilePic } from "../actions";

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

export default function App() {
    const [message, setMessage] = useState("");
    // const [isUploaderVisible, setIsUploaderVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const currentUser = useSelector((state) => state.user);
    const isUploaderVisible = useSelector((state) => state.isUploaderVisible);

    const dispatch = useDispatch();

    const showUploader = () => {
        console.log("show Uploader");
        dispatch(toggleUploaderVisible(true));
        // setIsUploaderVisible(true);
    };
    const hideUploader = () => {
        console.log("hide Uploader");
        dispatch(toggleUploaderVisible(false));
        // setIsUploaderVisible(false);
    };

    const onLogoutClick = async () => {
        console.log("LOGOUT");
        event.preventDefault();
        await axios.post("/api/logout", currentUser);
        location.reload();
    };

    useEffect(async () => {
        try {
            dispatch(getUser());
            setLoading(false);
        } catch (error) {
            setMessage({
                message: "Error logging in: " + error,
            });
            console.log("Error logging in: ", error);
            onLogoutClick();
        }
    }, []);
    useEffect(async () => {
        console.log("...(APP) currentUser: ", currentUser);
    }, [currentUser]);
    useEffect(async () => {
        console.log("...(APP) isUploaderVisible: ", isUploaderVisible);
    }, [isUploaderVisible]);

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
                                <span className="hideLabel">My Friends</span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/users/find">
                            <button>
                                <i className="material-icons">group_add</i>
                                <span className="hideLabel">Find Friends</span>
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
                    <Logout onClick={onLogoutClick}></Logout>
                    {!loading && (
                        <ProfilePic
                            profile_url={currentUser.profile_url}
                            first_name={currentUser.first_name}
                            last_name={currentUser.last_name}
                            showUploader={showUploader}
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
                                    first_name={currentUser.first_name}
                                    last_name={currentUser.last_name}
                                    bio={currentUser.bio}
                                    profile_url={currentUser.profile_url}
                                    loading={loading}
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
                        {isUploaderVisible && (
                            <Uploader hideUploader={hideUploader} />
                        )}
                    </section>
                </section>
                <Footer />
            </>
        </BrowserRouter>
    );
}
