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
            title: "Forgot your password? No worries, we'll send you an email to reset it!",
        };
        //bind methods here!
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    async onCodeSubmit(event) {
        event.preventDefault();
        try {
            await axios.post("/api/password/reset/step2", this.state);
            this.setState({ step: 3 });
        } catch (error) {
            console.log("...(onCodeSubmit) Error: ", error.response.data.error);
            this.setState({
                message: error.response.data.error,
            });
        }
    }
    async onEmailSubmit(event) {
        event.preventDefault();
        try {
            await axios.post("/api/password/reset/step1", this.state);
            this.setState({ step: 2 });
        } catch (error) {
            console.log(
                "...(onEmailSubmit) Error: ",
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
        console.log("STEP: ", this.state.step);
        console.log("Email: ", this.state.email);
        if (this.state.step == 1) {
            return (
                <div className="card authentificationform">
                    <h1>{this.state.title}</h1>
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
                        <div className="buttonsWrapper">
                            <button onClick={this.onEmailSubmit}>
                                <span className="flex">
                                    <i className="material-icons white">send</i>
                                </span>
                            </button>
                        </div>
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
                        <div className="buttonsWrapper">
                            <button onClick={this.onCodeSubmit}>
                                <span className="flex">
                                    <i className="material-icons white">send</i>
                                </span>
                            </button>
                        </div>
                    </form>
                    <p>{this.state.message}</p>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div className="card authentificationform">
                    <h1>Your password has been changed.</h1>
                    <form>
                        <div className="buttonsWrapper">
                            <Link to="/login">
                                <span className="flex">
                                    <i className="material-icons white">
                                        login
                                    </i>{" "}
                                </span>
                            </Link>
                        </div>
                    </form>

                    <p>{this.state.message}</p>
                </div>
            );
        }
    }
}
