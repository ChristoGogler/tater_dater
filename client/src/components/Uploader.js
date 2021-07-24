import axios from "../axios";
import { useEffect, useState } from "react";

export default function Uploader(props) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const onPictureUpload = async () => {
        console.log("...(onPictureUpload) file: ", file);

        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try {
            const result = await axios.post("/api/upload", formData);
            props.onUpload(result.data.user);
            props.hideUploader();
        } catch (error) {
            setMessage({
                message: "Problem uploading your photo: " + error,
            });
            console.log("ERROR uploading photo: ", error);
        }
    };

    const onFileinputChange = async () => {
        console.log("1", file);
        await setFile(event.target.files[0]);
    };

    useEffect(() => {
        console.log("EFFECT file: ", file);
        onPictureUpload();
    }, [file]);

    return (
        <section className="backdrop">
            <button className="closeButton" onClick={props.hideUploader}>
                ×
            </button>

            <section className="uploadSection">
                <h1>JJJJ</h1>
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
                            onChange={onFileinputChange}
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
