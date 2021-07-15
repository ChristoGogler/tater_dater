import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: null,
            code: null,
            message: null,
        };
        //bind methods here!
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onCodeSubmit(event) {
        console.log("...(onCodeSubmit) this.state: ", this.state);
        event.preventDefault();
        //axios here!
        axios
            .post("/api/password/reset/step2", this.state)
            .then((response) => {
                console.log("...(axios post) response: ", response);
                this.setState({ step: 3 });
            })
            .catch((error) => {
                console.log(
                    "...(onCodeSubmit) Error: ",
                    error.response.data.error
                );
                this.setState({
                    message: error.response.data.error,
                });
            });
    }
    onEmailSubmit(event) {
        console.log("...(onEmailSubmit) this.state: ", this.state);
        event.preventDefault();
        //axios here!
        axios
            .post("/api/password/reset/step1", this.state)
            .then((response) => {
                console.log("...(axios post) response: ", response);
                this.setState({ step: 2 });
            })
            .catch((error) => {
                console.log(
                    "...(onEmailSubmit) Error: ",
                    error.response.data.error
                );
                this.setState({
                    message: error.response.data.error,
                });
                console.log("Message ", this.state.message);
            });
    }
    onInputChange(event) {
        console.log("...(onInputChange) event.target: ", event.target);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        console.log("STEP: ", this.state.step);
        console.log("Email: ", this.state.email);
        if (this.state.step == 1) {
            return (
                <div className="card authentificationform">
                    <h1>
                        We will send a verification code to your address to
                        verify its you!
                    </h1>
                    <form>
                        <label htmlFor="email">
                            email
                            <input
                                id="id"
                                type="email"
                                name="email"
                                onChange={this.onInputChange}
                            ></input>
                        </label>
                        <button onClick={this.onEmailSubmit}>
                            <i className="material-icons">send</i>
                        </button>
                    </form>
                    <p>{this.state.message}</p>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div className="card authentificationform">
                    <h1>
                        Please enter the Code you have received in your email!
                    </h1>
                    <form>
                        <label htmlFor="code">
                            code
                            <input
                                type="text"
                                id="code"
                                name="code"
                                onChange={this.onInputChange}
                            ></input>
                        </label>
                        <label htmlFor="password">
                            new password
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.onInputChange}
                            ></input>
                        </label>

                        <button onClick={this.onCodeSubmit}>
                            <i className="material-icons">send</i>
                        </button>
                    </form>
                    <p>{this.state.message}</p>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div className="card authentificationform">
                    <h1>Your password has been changed.</h1>

                    <Link to="/login">
                        <i className="material-icons">login</i>
                    </Link>
                    <p>{this.state.message}</p>
                </div>
            );
        }
    }
}
