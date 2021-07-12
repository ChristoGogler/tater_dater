import { Component } from "react";
import Logout from "./Logout";
import axios from "../axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: null,
                last_name: null,
                id: null,
                email: null,
            },
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick() {
        console.log("...(onLogoutClick");
        event.preventDefault();
        axios.post("/logout", this.props.user).then((result) => {
            console.log(result);
            window.location = "/";
        });
    }
    render() {
        return (
            <section>
                <header>
                    <div>
                        <img className="logo" src="img/logo.png" alt="logo" />
                        <p>Hello World! Logged in!</p>
                        <Logout onClick={this.onLogoutClick}></Logout>
                    </div>
                </header>
            </section>
        );
    }
}
