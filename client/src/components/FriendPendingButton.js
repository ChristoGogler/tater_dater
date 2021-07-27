export default function FriendPendingButton({
    friendpending_toggle,
    onButtonClick,
}) {
    return (
        <div className="buttonsWrapper">
            <button
                className={
                    !friendpending_toggle
                        ? " btnPadding"
                        : " btnPadding selectedBtn"
                }
                onClick={onButtonClick}
                disabled={friendpending_toggle}
            >
                <span className="flex">
                    <i className="material-icons white">people</i>
                    Friends
                </span>
            </button>
            <button
                className={
                    friendpending_toggle
                        ? " btnPadding"
                        : " btnPadding selectedBtn"
                }
                onClick={onButtonClick}
                disabled={!friendpending_toggle}
            >
                <span className="flex">
                    <i className="material-icons white">person_add</i>
                    Pending
                </span>
            </button>
        </div>
    );
}
