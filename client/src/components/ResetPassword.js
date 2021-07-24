import axios from "../axios";
import { useState } from "react";
import SubmitButton from "./SubmitButton.js";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    const [resetPwInput, setResetPwInput] = useState({ step: 1 });
    const [message, setMessage] = useState("");

    const onCodeSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/password/reset/step2", resetPwInput);
            setResetPwInput({ ...resetPwInput, step: 3 });
            setMessage("");
        } catch (error) {
            console.log("...(onCodeSubmit) Error: ", error.response.data.error);
            setMessage(error.response.data.error);
        }
    };
    const onEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/password/reset/step1", resetPwInput);
            setResetPwInput({ ...resetPwInput, step: 2 });
            setMessage("");
        } catch (error) {
            console.log(
                "...(onEmailSubmit) Error: ",
                error.response.data.error
            );
            setMessage(error.response.data.error);
        }
    };
    const renderStep1 = () => {
        return (
            <div className="authentificationWrapper">
                <h1>
                    Forgot your password? No worries, we`ll send you an email to
                    reset it!
                </h1>
                <form>
                    <label htmlFor="email">
                        email
                        <input
                            id="id"
                            type="email"
                            name="email"
                            onChange={(e) =>
                                setResetPwInput({
                                    ...resetPwInput,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        ></input>
                    </label>
                    <SubmitButton onClick={onEmailSubmit} />
                </form>
                <p>{message}</p>
            </div>
        );
    };
    const renderStep2 = () => {
        return (
            <div className="authentificationWrapper">
                <h1>Please enter the Code you have received in your email!</h1>
                <form onClick={onCodeSubmit}>
                    <label htmlFor="code">
                        code
                        <input
                            type="text"
                            id="code"
                            name="code"
                            onChange={(e) =>
                                setResetPwInput({
                                    ...resetPwInput,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        ></input>
                    </label>
                    <label htmlFor="password">
                        new password
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) =>
                                setResetPwInput({
                                    ...resetPwInput,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        ></input>
                    </label>
                    <SubmitButton onClick={onCodeSubmit} />
                </form>
                <p>{message}</p>
            </div>
        );
    };
    const renderStep3 = () => {
        return (
            <div className="authentificationWrapper">
                <h1>Your password has been changed.</h1>
                <form>
                    <div className="buttonsWrapper btnPadding">
                        <Link to="/login">
                            <span className="flex">
                                <i className="material-icons white">login</i>
                            </span>
                        </Link>
                    </div>
                </form>

                <p>{message}</p>
            </div>
        );
    };
    return (
        <>
            {resetPwInput.step == 1 && renderStep1()}
            {resetPwInput.step == 2 && renderStep2()}
            {resetPwInput.step == 3 && renderStep3()}
        </>
    );
}
