import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        // console.log("BioEditor PROPS: ", props);
        this.state = {
            isBeingEdited: false,
            bioText: "",
        };
        this.renderShowMode = this.renderShowMode.bind(this);
        this.renderEditingMode = this.renderEditingMode.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    onEditClick() {
        console.log("...(Edit Button Click)");
        this.setState({
            isBeingEdited: true,
        });
    }

    onSaveClick() {
        console.log("...(Save Button Click)");
        event.preventDefault();

        this.props.onBioChange(this.state.bioText);
        this.setState({
            isBeingEdited: false,
        });
    }

    onInput() {
        console.log("...(onInput) event.target: ", event.target);
        this.setState({
            bioText: event.target.value,
        });
        console.log("State: ", this.state);
    }

    renderShowMode() {
        return (
            <div className="bioContent">
                <h1>Bio</h1>

                {this.props.bio ? (
                    <div>
                        <p>{this.props.bio}</p>
                        <button type="button" onClick={this.onEditClick}>
                            Edit Bio
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Tell us a little bit about you!</p>
                        <button type="button" onClick={this.onEditClick}>
                            add Bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
    renderEditingMode() {
        return (
            <form onSubmit={this.onSaveClick}>
                <textarea
                    className="bioTextarea"
                    name="bioTextarea"
                    id="bioTextarea"
                    cols="30"
                    rows="10"
                    onInput={this.onInput}
                ></textarea>
                <button type="submit">Save</button>
            </form>
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
