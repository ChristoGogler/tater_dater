import { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: null,
                last_name: null,
                id: null,
                email: null,
            },
        };
    }
    render() {
        return (
            <section>
                <header>
                    <div>
                        <img className="logo" src="img/logo.png" alt="logo" />
                        <p>Hello World! Logged in!</p>
                        <a href="/logout">Logout</a>
                    </div>
                </header>
            </section>
        );
    }
}
