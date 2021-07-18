import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";
import Footer from "./Footer";
export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <main className="welcome">
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </header>

                    <Route path="/" exact>
                        <nav>
                            <p>
                                <Link to="/login">
                                    <button>
                                        <i className="material-icons">login</i>
                                        <span class="hideLabel">Login</span>
                                    </button>
                                </Link>
                            </p>
                        </nav>
                        <div className="mainContent vcenter">
                            <Registration />
                        </div>
                    </Route>
                    <Route path="/login">
                        <nav>
                            <Link to="/">
                                <button>
                                    <i className="material-icons">how_to_reg</i>
                                    <span class="hideLabel">Sign up!</span>
                                </button>
                            </Link>

                            <Link to="password/reset">
                                <button>
                                    <i className="material-icons">password</i>
                                    <span class="hideLabel">
                                        Reset Password
                                    </span>
                                </button>
                            </Link>
                        </nav>
                        <div className="mainContent vcenter">
                            <Login />
                        </div>
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>

                    <Footer />
                </main>
            </HashRouter>
        );
    }
}
