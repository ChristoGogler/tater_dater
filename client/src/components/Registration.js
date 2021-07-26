import { useState } from "react";
import SubmitButton from "./SubmitButton.js";
import axios from "../axios";

export default function Registration() {
    const [registrationInput, setRegistrationInput] = useState({});
    const [message, setMessage] = useState("");

    const onRegistrationSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/api/register", registrationInput);
            location.reload();
        } catch (error) {
            console.log(
                "...(onRegistrationSubmit) Error: ",
                error.response.data.error
            );
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="authentificationWrapper">
            <h1>Sign up and match with other hot potatoes!</h1>
            <form onSubmit={onRegistrationSubmit}>
                <label htmlFor="first_name" value="First Name">
                    First Name
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        required
                        onChange={(e) =>
                            setRegistrationInput({
                                ...registrationInput,
                                [e.target.name]: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setRegistrationInput({
                                ...registrationInput,
                                [e.target.name]: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setRegistrationInput({
                                ...registrationInput,
                                [e.target.name]: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setRegistrationInput({
                                ...registrationInput,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </label>
                <SubmitButton />
            </form>
            <p className="message">{message}</p>
        </div>
    );
}
