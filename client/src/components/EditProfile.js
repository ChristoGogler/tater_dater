//components
import EditAccount from "./EditAccount";
import PhotoPicker from "./PhotoPicker";
import UploadPictureForm from "./UploadPictureForm";

//hooks
import { useDispatch } from "react-redux";

//redux
import { toggleUploaderVisible } from "../redux/action-creator";

export default function EditProfile(props) {
    const dispatch = useDispatch();

    return (
        <section className="backdrop">
            <button
                className="closeButton"
                onClick={() => dispatch(toggleUploaderVisible(false))}
            >
                ×
            </button>

            <section className="uploadSection">
                <h1>Choose a Profile Picture!</h1>
                <div>
                    <PhotoPicker id={props.id} />
                </div>
                <UploadPictureForm />
                <h1>Edit your Account</h1>

                <EditAccount />
            </section>
        </section>
    );
}
