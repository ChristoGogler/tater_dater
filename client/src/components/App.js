import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import {
    getUser,
    toggleUploaderVisible,
    receiveFriendsAndPending,
} from "../actions";

import Chat from "./Chat";
import FindProfile from "./FindProfile";
import Footer from "./Footer";
import Friends from "./Friends";
import Logo from "./Logo";
import Logout from "./Logout";
import MyProfile from "./MyProfile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import UserProfile from "./UserProfile";

export default function App() {
    // const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.user);
    const isUploaderVisible = useSelector((state) => state.isUploaderVisible);

    const dispatch = useDispatch();

    const showUploader = () => {
        dispatch(toggleUploaderVisible(true));
    };

    const onLogoutClick = async () => {
        await axios.post("/api/logout", currentUser);
        location.reload();
    };
    useEffect(async () => {
        try {
            // dispatch(stillLoading(true));
            dispatch(getUser());
            dispatch(receiveFriendsAndPending());
            // dispatch(stillLoading(false));
        } catch (error) {
            console.log("Error logging in: ", error);
            onLogoutClick();
        }
    }, []);

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
                    {
                        <ProfilePic
                            profile_url={currentUser.profile_url}
                            first_name={currentUser.first_name}
                            last_name={currentUser.last_name}
                            showUploader={showUploader}
                            className="avatar smallProfilePic"
                        />
                    }
                </nav>
                <section className="mainContent vcenter">
                    <Switch>
                        <Route exact path="/" render={() => <MyProfile />} />
                        <Route path="/friends/list" component={Friends} />
                        <Route path="/users/find" component={FindProfile} />
                        <Route path="/user/:id" component={UserProfile}></Route>
                        <Route path="/chat" component={Chat} />
                        <Route path="/">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                    <section className="modal">
                        {isUploaderVisible && <Uploader />}
                    </section>
                </section>
                <Footer />
            </>
        </BrowserRouter>
    );
}
