import ReactDOM from "react-dom";
import axios from "axios";
import Welcome from "./components/Welcome";

axios.get("/user/id.json").then(({ data }) => {
    console.log(
        "...(start.js axios GET /user/id.json) result.data: ",
        data.userId
    );
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <img src="/logo.gif" alt="logo" />,
            document.querySelector("main")
        );
    }
});
