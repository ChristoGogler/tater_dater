//components
import SubmitButton from "./SubmitButton.js";
import { Link } from "react-router-dom";

//hooks
import { useSelector, useDispatch } from "react-redux";
import { useStatefulFields } from "../hooks/hooks.js";

//redux
import { resetPwNextStep } from "../redux/action-creator";

export default function ResetPassword() {
    const currentStep = useSelector((state) => state.resetPassword.step);
    const [inputValues, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(resetPwNextStep(currentStep, inputValues));
    };

    const renderStep1 = () => {
        return (
            <div className="authentificationWrapper">
                <h1>
                    Forgot your password? No worries, we`ll send you an email to
                    reset it!
                </h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">
                        email
                        <input
                            id="id"
                            type="email"
                            name="email"
                            onChange={handleChange}
                        ></input>
                    </label>
                    <SubmitButton />
                </form>
                <p>{currentStep.message}</p>
            </div>
        );
    };
    const renderStep2 = () => {
        return (
            <div className="authentificationWrapper">
                <h1>Please enter the Code you have received in your email!</h1>
                <form onClick={onSubmit}>
                    <label htmlFor="code">
                        code
                        <input
                            type="text"
                            id="code"
                            name="code"
                            onChange={handleChange}
                        ></input>
                    </label>
                    <label htmlFor="password">
                        new password
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                        ></input>
                    </label>
                    <SubmitButton />
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
