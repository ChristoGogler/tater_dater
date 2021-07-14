import { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
        };

        //bind methods here!
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick() {
        this.setState({
            loggedIn: false,
        });
        this.props.onClick();
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div className="logoutComponent">
                    <button type="submit" onClick={this.onLogoutClick}>
                        <i className="material-icons">logout</i> Logout
                    </button>
                </div>
            );
        }
        return <div className="logoutComponent"></div>;
    }
}
