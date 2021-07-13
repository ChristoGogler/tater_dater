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
        });
    }
    onFileinputChange() {
        this.setState({ file: event.target.files[0] });
        console.log("...(onFileinputChange) value: ", event.target.value);
    }

    render() {
        return (
            <section className="backdrop">
                <div className="uploader">
                    <button
                        className="closeButton"
                        onClick={this.props.hideUploader}
                    >
                        x
                    </button>
                    <section id="uploadSection">
                        <form
                            id="uploadForm"
                            encType="multipart/form-data"
                            action="/api/upload"
                            method="POST"
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
                            <button
                                className="button submitButton"
                                type="submit"
                                onClick={this.onPictureUpload}
                            >
                                Upload
                            </button>
                        </form>
                    </section>
                </div>
                <p>Modal</p>
            </section>
        );
    }
}
