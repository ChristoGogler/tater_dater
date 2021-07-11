import { Component } from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        // call superconstrutor from Component
        super(props);

        //first state of
        this.state = {
            email: null,
            password: null,
            loggedin: false,
            message: null,
            title: "Login Page",
        };

        //bind methods here!
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onLoginSubmit(event) {
        console.log("...(onLoginSubmit) this.state: ", this.state);
        event.preventDefault();
        //axios here!
        axios
            .post("/api/login", this.state)
            .then((response) => {
                console.log("...(axios post) response: ", response);
                window.location = "/";
            })
            .catch((error) => {
                console.log(
                    "...(onLoginSubmit) Error: ",
                    error.response.data.error
                );
                this.setState({
                    message: error.response.data.error,
                });
            });
    }
    onInputChange(event) {
        console.log("...(onInputChange) event.target: ", event.target);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div className="authentificationform">
                <p>{this.title}</p>
                <form onSubmit={this.onLoginSubmit}>
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            required
                            onChange={this.onInputChange}
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******"
                            required
                            onChange={this.onInputChange}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>

                <p className="message">{this.state.message}</p>
                <p>
                    Not yet registered? <Link to="/">Sign up now!</Link>
                </p>
            </div>
        );
    }
}
