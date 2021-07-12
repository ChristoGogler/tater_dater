import ReactDOM from "react-dom";
import axios from "./axios";
import Welcome from "./components/Welcome";
import { Link } from "react-router-dom";

axios.get("/user/id.json").then(({ data }) => {
    console.log("...(start.js axios GET /user/id.json) result.data: ", data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <div>
                <img className="logo" src="img/logo.png" alt="logo" />
                <p>Hello World! Logged in!</p>
                <a href="/logout">Logout</a>
            </div>,
            document.querySelector("main")
        );
    }
});
