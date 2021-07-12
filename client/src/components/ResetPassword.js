import React from "react";
import axios from "../axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: null,
            message: null,
        };
        //bind methods here!
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onEmailSubmit(event) {
        console.log("...(onEmailSubmit) this.state: ", this.state);
        event.preventDefault();
        //axios here!
        axios
            .post("/password/reset/step1", this.state)
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
                <div>
                    <p>
                        We will send a verification code to your address to
                        verify its you!
                    </p>
                    <input name="email" onChange={this.onInputChange}></input>
                    <button onClick={this.onEmailSubmit}>Submit</button>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div>
                    <p>
                        Please enter the Code you have received in your email!
                    </p>
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            name="email"
                            onChange={this.onInputChange}
                            value={this.state.email}
                        ></input>
                    </label>
                    <label htmlFor="code">
                        Code
                        <input
                            id="code"
                            name="code"
                            onChange={this.onInputChange}
                        ></input>
                    </label>

                    <button onClick={this.onEmailSubmit}>Submit</button>
                </div>
            );
        }
    }
}
