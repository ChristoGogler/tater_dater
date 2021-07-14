import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBeingEdited: false,
            bioText: "",
        };
        this.renderShowMode = this.renderShowMode.bind(this);
        this.renderEditingMode = this.renderEditingMode.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }
    onEditClick() {
        // console.log("...(Edit Button Click)");
        this.setState({
            isBeingEdited: true,
            bioText: this.props.bio,
        });
    }

    onCancelClick() {
        // console.log("...(Cancel Button Click)");
        event.preventDefault();
        this.setState({
            isBeingEdited: false,
        });
    }

    onSaveClick() {
        // console.log("...(Save Button Click)");
        event.preventDefault();

        this.props.onBioChange(this.state.bioText);
        this.setState({
            isBeingEdited: false,
        });
    }

    onInput() {
        this.setState({
            bioText: event.target.value,
        });
    }

    renderShowMode() {
        return (
            <div className="bioContent">
                <h1>Bio</h1>

                {this.props.bio ? (
                    <div>
                        <p>{this.props.bio}</p>
                        <button type="button" onClick={this.onEditClick}>
                            <i className="material-icons">edit</i>Login Edit Bio
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Tell us a little bit about you!</p>
                        <button type="button" onClick={this.onEditClick}>
                            <i className="material-icons">post_add</i>
                            add Bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
    renderEditingMode() {
        return (
            <div className="bioContent">
                <h1>Bio</h1>
                <form>
                    <textarea
                        className="bioTextarea"
                        name="bioTextarea"
                        id="bioTextarea"
                        cols="30"
                        rows="10"
                        value={this.state.bioText}
                        onInput={this.onInput}
                    ></textarea>
                    <button type="submit" onClick={this.onSaveClick}>
                        <i className="material-icons">task_alt</i>
                        Save
                    </button>
                    <button type="button" onClick={this.onCancelClick}>
                        <i className="material-icons">highlight_off</i>
                        Cancel
                    </button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <section className="bioEditor">
                {this.state.isBeingEdited
                    ? this.renderEditingMode()
                    : this.renderShowMode()}
            </section>
        );
    }
}
