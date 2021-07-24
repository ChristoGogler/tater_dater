export default function SubmitButton({ onClick }) {
    return (
        <div className="buttonsWrapper">
            <button onClick={onClick} type="submit" className="btnPadding">
                <span className="flex">
                    <i className="material-icons white">send</i>
                </span>
            </button>
        </div>
    );
}
