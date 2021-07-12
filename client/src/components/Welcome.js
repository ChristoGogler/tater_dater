import { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
// console.log("login: ", Login);
export default function Welcome() {
    return (
        <div className="welcome">
            <header>
                {/* <img className="logo" src="img/logo.png" alt="Logo" /> */}
            </header>
            <HashRouter>
                <div>
                    <Route path="/" exact>
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </HashRouter>
        </div>
    );
}

// export default class Welcome extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {};
//     }
//     render() {
//         return (
//             <div>
//                 <header>
//                     <img className="logo" src="img/logo.png" alt="Logo" />
//                 </header>
//                 <section className="content">
//                     <HashRouter>
//                         <Route path="/login">
//                             <Login />
//                         </Route>
//                         <Route exact path="/">
//                             <Registration />
//                         </Route>
//                     </HashRouter>
//                 </section>
//                 <footer></footer>
//             </div>
//         );
//     }
// }
