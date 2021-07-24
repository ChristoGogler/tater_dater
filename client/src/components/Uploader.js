import axios from "../axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePic } from "../actions";

export default function Uploader(props) {
    // const profile_url = useSelector((state) => state.user.proofile_url);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const onPictureUpload = async () => {
        console.log("onPictureUpload", file);
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        await dispatch(updateProfilePic(formData));
        props.hideUploader();
    };

    useEffect(() => {
        console.log("EFFECT file: ", file);
        if (file != null) {
            onPictureUpload();
        }
    }, [file]);

    return (
        <section className="backdrop">
            <button className="closeButton" onClick={props.hideUploader}>
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
                            onChange={() => setFile(event.target.files[0])}
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
