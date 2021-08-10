//hooks
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

//redux
import { saveBio, toggleBioEditor, getUser } from "../redux/action-creator";

export default function BioEditor() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const bioEditor = useSelector((state) => state.bioEditor);

    let bioText = React.createRef();

    const onEditClick = () => {
        dispatch(toggleBioEditor({ isBeingEdited: true }));
    };

    const onCancelClick = () => {
        event.preventDefault();
        dispatch(toggleBioEditor({ isBeingEdited: false }));
    };

    const onSaveClick = async () => {
        event.preventDefault();
        dispatch(saveBio(bioText.current.value));
        dispatch(toggleBioEditor({ isBeingEdited: false }));
    };
    useEffect(() => {
        dispatch(getUser(currentUser));
    }, [dispatch]);

    const renderShowMode = () => {
        return (
            <>
                {currentUser ? (
                    <>
                        <p>
                            <span className="bolder">Bio: </span>
                            {currentUser.bio}
                        </p>
                        <button type="button" onClick={onEditClick}>
                            <i className="material-icons editButton">edit</i>
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            Tell us a little bit about you! What kind of potato
                            are you? How many potatoes can you fit into your
                            mouth? Whos your secret potato crush?
                        </p>
                        <button type="button" onClick={onEditClick}>
                            <i className="material-icons editButton">
                                post_add
                            </i>
                        </button>
                    </>
                )}
            </>
        );
    };
    const renderEditingMode = () => {
        return (
            <>
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
                        <button
                            id="saveButton"
                            type="submit"
                            onClick={onSaveClick}
                        >
                            <i className="material-icons">task_alt</i>
                        </button>
                        <button
                            id="cancelButton"
                            type="button"
                            onClick={onCancelClick}
                        >
                            <i className="material-icons">highlight_off</i>
                        </button>
                    </div>
                </form>
            </>
        );
    };
    return (
        <>{bioEditor.isBeingEdited ? renderEditingMode() : renderShowMode()}</>
    );
}
