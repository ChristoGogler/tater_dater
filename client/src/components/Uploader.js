export default function Uploader({ hideUploader }) {
    return (
        <section className="backdrop">
            <div className="uploader">
                <button className="closeButton" onClick={hideUploader}>
                    x
                </button>
            </div>
            <p>Modal</p>
        </section>
    );
}
