import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";
import Footer from "./Footer";
export default function Welcome() {
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
                                    <span className="hideLabel">Login</span>
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
                                <span className="hideLabel">Sign up!</span>
                            </button>
                        </Link>

                        <Link to="password/reset">
                            <button>
                                <i className="material-icons">password</i>
                                <span className="hideLabel">
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
                    <nav>
                        <Link to="/">
                            <button>
                                <i className="material-icons">how_to_reg</i>
                                <span className="hideLabel">Sign up!</span>
                            </button>
                        </Link>
                        <Link to="/login">
                            <button>
                                <i className="material-icons">login</i>
                                <span className="hideLabel">Login</span>
                            </button>
                        </Link>
                    </nav>
                    <div className="mainContent vcenter">
                        <ResetPassword />
                    </div>
                </Route>

                <Footer />
            </main>
        </HashRouter>
    );
}
