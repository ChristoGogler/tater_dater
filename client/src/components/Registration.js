import { Component } from "react";
import axios from "../axios";

export default class Registration extends Component {
    constructor(props) {
        // call superconstrutor from Component
        super(props);

        //first state of
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            loggedin: false,
            message: "",
            title: "Sign up and find your lucky potato!",
        };

        //bind methods here!
        this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    async onRegistrationSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("/api/register", this.state);
            console.log("...(axios post) response: ", response);
            location.reload();
        } catch (error) {
            console.log(
                "...(onRegistrationSubmit) Error: ",
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
                <form onSubmit={this.onRegistrationSubmit}>
                    <label htmlFor="first_name" value="First Name">
                        First Name
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="first name"
                            required
                            onChange={this.onInputChange}
                        />
                    </label>
                    <label htmlFor="last_name">
                        Last Name
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="last name"
                            required
                            onChange={this.onInputChange}
                        />
                    </label>
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
                    <div className="buttonsWrapper btnPadding">
                        <button type="submit" className="btnPadding">
                            <span className="flex">
                                <i className="material-icons white">send</i>
                            </span>
                        </button>
                    </div>
                </form>
                <p className="message">{this.state.message}</p>
            </div>
        );
    }
}
