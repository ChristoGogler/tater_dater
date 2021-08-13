import ReactDOM from "react-dom";
import axios from "./axios";
import Welcome from "./components/Welcome";
import App from "./components/App";
import reducer from "./redux/reducer";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialiseSocket } from "../public/socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

axios.get("/api/user/verifylogin").then(({ data }) => {
    console.log("start: ", data);
    if (!data.userId) {
        ReactDOM.render(
            <Provider store={store}>
                <Welcome />
            </Provider>,
            document.querySelector("main")
        );
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById("main")
        );
        initialiseSocket(store);
    }
});
