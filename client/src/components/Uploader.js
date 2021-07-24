import { useDispatch } from "react-redux";
import { updateProfilePic, toggleUploaderVisible } from "../actions";

export default function Uploader() {
    const dispatch = useDispatch();

    const onPictureUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        await dispatch(updateProfilePic(formData));
        dispatch(toggleUploaderVisible(false));
    };

    return (
        <section className="backdrop">
            <button
                className="closeButton"
                onClick={() => dispatch(toggleUploaderVisible(false))}
            >
                ×
            </button>

            <section className="uploadSection">
                <h1>Choose a new profile picture!</h1>
                <form
                    id="uploadForm"
                    encType="multipart/form-data"
                    action="/api/upload"
                    method="POST"
                >
                    <label className="buttonsWrapper btnPadding" forhtml="file">
                        <input
                            id="file"
                            className="textfield"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={() =>
                                onPictureUpload(event.target.files[0])
                            }
                            required
                        />
                        <span className="flex">
                            <i className="material-icons white">add_a_photo</i>
                            choose a picture
                        </span>
                    </label>
                </form>
                {/* {message && <p>{message}</p>} */}
            </section>
        </section>
    );
}
