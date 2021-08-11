//components
import BioEditorForm from "./forms/BioEditorForm";

//hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//redux
import { toggleBioEditor, getUser } from "../redux/action-creator";

export default function BioEditor() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const bioEditor = useSelector((state) => state.bioEditor);

    const onEditClick = () => {
        dispatch(toggleBioEditor({ isBeingEdited: true }));
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
        return <BioEditorForm />;
    };
    return (
        <>{bioEditor.isBeingEdited ? renderEditingMode() : renderShowMode()}</>
    );
}
