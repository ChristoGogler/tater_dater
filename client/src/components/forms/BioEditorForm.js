//hooks
import { useSelector, useDispatch } from "react-redux";
import React from "react";

//redux
import { saveBio, toggleBioEditor } from "../../redux/action-creator";

export default function BioEditorForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    let bioText = React.createRef();

    const onCancelClick = () => {
        event.preventDefault();
        dispatch(toggleBioEditor({ isBeingEdited: false }));
    };

    const onSaveClick = async () => {
        event.preventDefault();
        dispatch(saveBio(bioText.current.value));
        dispatch(toggleBioEditor({ isBeingEdited: false }));
    };
    return (
        <form>
            <textarea
                ref={bioText}
                className="bioTextarea"
                name="bioTextarea"
                id="bioTextarea"
                cols="30"
                rows="10"
                defaultValue={currentUser.bio}
            ></textarea>
            <div className="bioeditorButtons">
                <button id="saveButton" type="submit" onClick={onSaveClick}>
                    <i className="material-icons">task_alt</i>
                </button>
                <button id="cancelButton" type="button" onClick={onCancelClick}>
                    <i className="material-icons">highlight_off</i>
                </button>
            </div>
        </form>
    );
}
