import axios from "../axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            message: "",
        };
        this.onPictureUpload = this.onPictureUpload.bind(this);
        this.onFileinputChange = this.onFileinputChange.bind(this);
    }
    async onPictureUpload() {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const result = await axios.post("/api/upload", formData);
            this.props.onUpload(result.data.user);
            this.props.hideUploader();
        } catch (error) {
            this.setState({
                message: "Problem uploading your photo: " + error,
            });
            console.log("ERROR uploading photo: ", error);
        }
    }

    async onFileinputChange() {
        await this.setState({ file: event.target.files[0] });
        this.onPictureUpload();
    }

    render() {
        return (
            <section className="backdrop">
                <button
                    className="closeButton"
                    onClick={this.props.hideUploader}
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
                        <label
                            className="buttonsWrapper btnPadding"
                            forhtml="file"
                        >
                            <input
                                id="file"
                                className="textfield"
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={this.onFileinputChange}
                                required
                            />
                            <span className="flex">
                                <i className="material-icons white">
                                    add_a_photo
                                </i>
                                choose a picture
                            </span>
                        </label>
                    </form>
                    {this.state.message && <p>{this.state.message}</p>}
                </section>
            </section>
        );
    }
}
