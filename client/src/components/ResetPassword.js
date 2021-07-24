import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { resetPwNextStep } from "../actions";
import SubmitButton from "./SubmitButton.js";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    const currentStep = useSelector((state) => state.resetPassword.step);
    const [resetPwInput, setResetPwInput] = useState();
    const dispatch = useDispatch();

    const onCodeSubmit = async (event) => {
        event.preventDefault();

        dispatch(resetPwNextStep(currentStep, resetPwInput));
    };
    const onEmailSubmit = async (event) => {
        event.preventDefault();
        dispatch(resetPwNextStep(currentStep, resetPwInput));
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
                <p>{currentStep.message}</p>
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
                <p>{currentStep.message}</p>
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

                <p>{currentStep.message}</p>
            </div>
        );
    };
    return (
        <>
            {currentStep == 1 && renderStep1()}
            {currentStep == 2 && renderStep2()}
            {currentStep == 3 && renderStep3()}
        </>
    );
}
