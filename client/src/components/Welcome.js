import { HashRouter, Route } from "react-router-dom";
import { Component } from "react";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";
// console.log("login: ", Login);
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: "./img/logo.png",
        };
    }
    render() {
        return (
            <div className="welcome">
                <Logo logo={this.state.logo}></Logo>
                <HashRouter>
                    <div>
                        <Route path="/" exact>
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/password/reset">
                            <ResetPassword />
                        </Route>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
