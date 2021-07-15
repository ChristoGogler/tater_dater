import axios from "../axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onPictureUpload = this.onPictureUpload.bind(this);
        this.onFileinputChange = this.onFileinputChange.bind(this);
    }
    onPictureUpload() {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        console.log(formData);
        axios.post("/api/upload", formData).then((result) => {
            this.props.onUpload(result.data.user);
            this.props.hideUploader();
        });
    }
    onFileinputChange() {
        this.setState({ file: event.target.files[0] });
        console.log("...(onFileinputChange) value: ", event.target.value);
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
                        <label className="file-upload" forhtml="file">
                            <input
                                id="file"
                                className="textfield"
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={this.onFileinputChange}
                                required
                            />
                            <span>choose a picture</span>
                        </label>
                        <div className="bioeditorButtons">
                            <button
                                className="button submitButton"
                                type="submit"
                                onClick={this.onPictureUpload}
                            >
                                <i className="material-icons picUploadIcon">
                                    add_a_photo
                                </i>
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        );
    }
}
