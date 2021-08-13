//components
import SubmitButton from "./SubmitButton.js";

//hooks
import { useStatefulFields, useAuthSubmit } from "../hooks/hooks.js";

export default function Login() {
    const [inputValues, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/api/user/login", inputValues);

    return (
        <div className="authentificationWrapper">
            <h1>Login with your email!</h1>
            <form onSubmit={submit}>
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email"
                        required
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </label>
                <SubmitButton />
            </form>

            <p className="message">{error}</p>
        </div>
    );
}
