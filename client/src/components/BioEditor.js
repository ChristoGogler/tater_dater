import { Component } from "react";
import axios from "../axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBeingEdited: false,
            bioText: "",
            message: "",
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

    async onSaveClick() {
        event.preventDefault();
        try {
            const user = await axios.put("/api/user/update/bio", {
                bio: this.state.bioText,
            });
            this.props.onBioChange(user.data);
            this.setState({
                isBeingEdited: false,
            });
        } catch (error) {
            console.log("ERROR saving bio");
            this.state.message =
                "Error saving your bio. Please try again later.";
        }
    }

    onInput() {
        this.setState({
            bioText: event.target.value,
        });
    }

    renderShowMode() {
        return (
            <>
                {this.props.bio ? (
                    <>
                        <p>{this.props.bio}</p>
                        <button type="button" onClick={this.onEditClick}>
                            <i className="material-icons editButton">edit</i>
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            Tell us a little bit about you! What kind of potato
                            are you? How many potatoes can you fit into your
                            mouth? Who's your secret potato crush?
                        </p>
                        <button type="button" onClick={this.onEditClick}>
                            <i className="material-icons editButton">
                                post_add
                            </i>
                        </button>
                    </>
                )}
            </>
        );
    }
    renderEditingMode() {
        return (
            <>
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
                    <div className="bioeditorButtons">
                        <button
                            id="saveButton"
                            type="submit"
                            onClick={this.onSaveClick}
                        >
                            <i className="material-icons">task_alt</i>
                        </button>
                        <button
                            id="cancelButton"
                            type="button"
                            onClick={this.onCancelClick}
                        >
                            <i className="material-icons">highlight_off</i>
                        </button>
                    </div>
                </form>
            </>
        );
    }

    render() {
        return (
            <>
                {this.state.isBeingEdited
                    ? this.renderEditingMode()
                    : this.renderShowMode()}
                {this.state.message && <p>this.state.message</p>}
            </>
        );
    }
}
