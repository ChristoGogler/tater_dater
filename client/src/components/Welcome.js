import { Component } from "react";
import Registration from "./Registration";

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div>
                <header>
                    <img src="./img/logo.png" alt="Logo" />
                </header>
                <section className="content">
                    <Registration></Registration>
                    <p>
                        Already signed up? <a href="#">Log in now!</a>
                    </p>
                </section>
                <footer></footer>
            </div>
        );
    }
}
