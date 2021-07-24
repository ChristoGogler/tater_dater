import { Component } from "react";
import SubmitButton from "./SubmitButton.js";
import axios from "../axios";

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
            title: "Login with your email!",
        };

        //bind methods here!
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    async onLoginSubmit(event) {
        console.log("...(onLoginSubmit) this.state: ", this.state);
        event.preventDefault();

        try {
            const response = await axios.post("/api/login", this.state);

            console.log("...(axios post) response: ", response);
            location.reload();
        } catch (error) {
            console.log(
                "...(onLoginSubmit) Error: ",
                error.response.data.error
            );
            this.setState({
                message: error.response.data.error,
            });
        }
    }
    onInputChange(event) {
        console.log("...(onInputChange) event.target: ", event.target);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div className="authentificationWrapper">
                <h1>{this.state.title}</h1>
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
                    <SubmitButton />
                </form>

                <p className="message">{this.state.message}</p>
            </div>
        );
    }
}
