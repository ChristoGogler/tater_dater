import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";
// console.log("login: ", Login);
export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div className="welcome">
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </header>
                    <div>
                        <Route path="/" exact>
                            <Registration />
                            <nav>
                                <p>
                                    <Link to="/login">
                                        <button>
                                            <i className="material-icons">
                                                login
                                            </i>
                                            Login
                                        </button>
                                    </Link>
                                </p>
                            </nav>
                        </Route>
                        <Route path="/login">
                            <Login />
                            <nav>
                                <p>
                                    <Link to="/">
                                        <button>
                                            <i className="material-icons">
                                                how_to_reg
                                            </i>
                                            Sign up now!
                                        </button>
                                    </Link>
                                </p>
                                <p>
                                    <Link to="password/reset">
                                        <button>
                                            <i className="material-icons">
                                                password
                                            </i>
                                            Reset Password
                                        </button>
                                    </Link>
                                </p>
                            </nav>
                        </Route>
                        <Route path="/password/reset">
                            <ResetPassword />
                            <nav></nav>
                        </Route>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
