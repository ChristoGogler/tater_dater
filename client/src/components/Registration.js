import { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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
        };

        //bind methods here!
        this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onRegistrationSubmit(event) {
        console.log("...(onRegistrationSubmit) event", this.state);
        event.preventDefault();
        //axios here!
        axios.post("/api/register", this.state).then((response) => {
            console.log("...(axios post) response: ", response);
            ReactDOM.redirect("/");
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
            <div className="registration">
                <form onSubmit={this.onRegistrationSubmit}>
                    <label htmlFor="first_name" value="First Name">
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="first name"
                            required
                            onChange={this.onInputChange}
                        />
                        First Name
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
