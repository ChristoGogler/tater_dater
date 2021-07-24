import { useState } from "react";
import SubmitButton from "./SubmitButton.js";
import axios from "../axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const onLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/api/login", {
                email,
                password,
            });
            location.reload();
        } catch (error) {
            console.log(
                "...(onLoginSubmit) Error: ",
                error.response.data.error
            );
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="authentificationWrapper">
            <h1>Login with your email!</h1>
            <form onSubmit={onLoginSubmit}>
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <SubmitButton />
            </form>

            <p className="message">{message}</p>
        </div>
    );
}
