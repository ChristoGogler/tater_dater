import ReactDOM from "react-dom";
import axios from "./axios";
import Welcome from "./components/Welcome";
import App from "./components/App";

axios.get("/user/id.json").then(({ data }) => {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(<App />, document.querySelector("main"));
    }
});
