import { Component } from "react";

export default class Registration extends Component {
    constructor(props) {
        // call superconstrutor from Component
        super(props);

        //first state of
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
        };

        //bind methods here!
    }
    render() {
        return (
            <div className="registration">
                <form onSubmit="onSubmit">
                    <label htmlFor="first_name">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="first name"
                            required
                        />
                    </label>
                    <label htmlFor="last_name">
                        <input
                            type="text"
                            name="last_name"
                            placeholder="last name"
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            name="password"
                            placeholder="******"
                            required
                        />
                    </label>
                    <button type="submit"></button>
                </form>
            </div>
        );
    }
}
