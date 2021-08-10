import { useDispatch } from "react-redux";
import {
    updateProfilePic,
    toggleUploaderVisible,
} from "../redux/action-creator";
import EditAccount from "./EditAccount";
import PhotoPicker from "./PhotoPicker";
import UploadPictureForm from "./UploadPictureForm";
export default function Uploader(props) {
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
                {/* {message && <p>{message}</p>} */}
            </section>
        </section>
    );
}
