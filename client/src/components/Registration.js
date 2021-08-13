//components
import SubmitButton from "./SubmitButton.js";

//hooks
import { useStatefulFields, useAuthSubmit } from "../hooks/hooks.js";

export default function Registration() {
    const [inputValues, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/api/user/register", inputValues);

    return (
        <div className="authentificationWrapper">
            <h1>Sign up and match with other hot potatoes!</h1>
            <form onSubmit={submit}>
                <label htmlFor="first_name" value="First Name">
                    First Name
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        required
                        onChange={handleChange}
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
                        onChange={handleChange}
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
