//hooks
import { useSelector, useDispatch } from "react-redux";

//redux
import {
    toggleUserProfile,
    updateProfileDetails,
} from "../../redux/action-creator";

export default function ProfileDetailsForm() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);

    const onCancelClick = () => {
        event.preventDefault();
        dispatch(toggleUserProfile({ isBeingEdited: false }));
    };

    const onSaveClick = async (event) => {
        event.preventDefault();
        console.log("...(ProfileDetailsForm) event: ", event);
        const inputValues = extractInputValues(event);
        console.log("...(ProfileDetailsForm) inputValues: ", inputValues);

        dispatch(updateProfileDetails(inputValues));
        dispatch(toggleUserProfile({ isBeingEdited: false }));
    };
    return (
        <div className="authentificationWrapper">
            <form onSubmit={(event) => onSaveClick(event)}>
                <label htmlFor="about_me" value="First Name">
                    about me
                    <input
                        id="about_me"
                        type="text"
                        name="about_me"
                        placeholder="about"
                        defaultValue={userProfile.about_me}
                    />
                </label>
                <label htmlFor="city" value="City">
                    city
                    <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="city"
                        defaultValue={userProfile.city}
                    />
                </label>
                <label htmlFor="likes" value="Likes">
                    likes
                    <input
                        id="likes"
                        type="text"
                        name="likes"
                        placeholder="likes"
                        defaultValue={userProfile.likes}
                    />
                </label>
                <label htmlFor="dislikes" value="Dislikes">
                    dislikes
                    <input
                        id="dislikes"
                        type="text"
                        name="dislikes"
                        placeholder="dislikes"
                        defaultValue={userProfile.dislikes}
                    />
                </label>
                <label htmlFor="interested_in" value="Interested In">
                    interested in
                    <input
                        id="interested_in"
                        type="text"
                        name="interested_in"
                        placeholder="interested in"
                        defaultValue={userProfile.interested_in}
                    />
                </label>
                <label htmlFor="gender" value="Gender">
                    pronouns
                    <input
                        id="gender"
                        type="text"
                        name="gender"
                        placeholder="gender"
                        defaultValue={userProfile.gender}
                    />
                </label>
                <label htmlFor="orientation" value="Orientation">
                    orientation
                    <input
                        id="orientation"
                        type="text"
                        name="orientation"
                        placeholder="orientation"
                        defaultValue={userProfile.orientation}
                    />
                </label>
                <div className="bioeditorButtons">
                    <button id="saveButton" type="submit">
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
        </div>
    );
}

const extractInputValues = ({ target }) => {
    const inputValues = {};
    Object.entries(target)
        .filter((element) => element[1].name)
        .forEach((element) => {
            inputValues[element[1].name] = element[1].value;
        });
    return inputValues;
};
