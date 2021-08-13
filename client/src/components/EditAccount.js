//components
import SubmitButton from "./SubmitButton";

//hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//redux
import {
    updateAccount,
    onUserInputChange,
    getUser,
    toggleUploaderVisible,
} from "../redux/action-creator";

export default function EditAccount() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userInput = useSelector((state) => state.userInput);

    useEffect(() => {
        if (userInput.first_name) {
            dispatch(updateAccount(userInput));
            dispatch(getUser());
        }
    }, [userInput]);

    return (
        <div className="authentificationWrapper">
            {user && (
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        await dispatchUserInput(event, dispatch);
                        dispatch(toggleUploaderVisible(false));
                    }}
                >
                    <label htmlFor="first_name" value="First Name">
                        First Name
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="first name"
                            defaultValue={user.first_name}
                            required
                        />
                    </label>
                    <label htmlFor="last_name">
                        Last Name
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="last name"
                            defaultValue={user.last_name}
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            defaultValue={user.email}
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******"
                        />
                    </label>
                    <SubmitButton />
                </form>
            )}
        </div>
    );
}
async function dispatchUserInput(event, dispatch) {
    const { first_name, last_name, email, password } = event.target;

    if (!password.value) {
        await dispatch(
            onUserInputChange({
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
            })
        );
    } else {
        await dispatch(
            onUserInputChange({
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
            })
        );
    }
}
