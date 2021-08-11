export default function Logout(props) {
    return (
        <div className="logoutComponent">
            <button type="submit" onClick={props.onClick}>
                <i className="material-icons">logout</i>
                <span className="hideLabel">Logout</span>
            </button>
        </div>
    );
}
