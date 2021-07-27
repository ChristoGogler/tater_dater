import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    addRemovePotato,
    receivePotatoCount,
    receivePotatoButtonState,
} from "../actions";

export default function HotPotatoButton(props) {
    const dispatch = useDispatch();
    const potatoCount = useSelector((state) => state.potatoCount);
    const potatoButtonState = useSelector((state) => state.potatoButtonState);
    const onPotatoClick = () => {
        if (potatoButtonState) {
            dispatch(addRemovePotato(1, props.user_id));
        } else {
            dispatch(addRemovePotato(0, props.user_id));
        }
    };

    useEffect(() => {
        dispatch(receivePotatoCount(props.user_id));
        dispatch(receivePotatoButtonState(props.user_id));
    }, []);
    return (
        <div className="buttonsWrapper">
            <button
                onClick={onPotatoClick}
                type="submit"
                className="button potatoButton btnPadding"
            >
                <span className="flex">
                    <i className="material-icons white">whatshot</i>
                    <span>{potatoCount}</span>
                    <span className="hideLabel">
                        {potatoCount == 1 ? `Hot Potato` : `Hot Potatoes`}
                    </span>
                </span>
            </button>
            {/*  */}
            {/* <button
                className={
                    smallButton
                        ? "button submitButton tooltip"
                        : "button submitButton btnPadding tooltip"
                }
                onClick={onButtonClick}
            >
                {smallButton && (
                    <span className="tooltiptext">{buttonState}</span>
                )}

                <span className="flex">
                    <i className="material-icons white">{iconState}</i>
                    {!smallButton && (
                        <span className="hideLabel">{buttonState}</span>
                    )}
                </span>
            </button> */}
        </div>
    );
}
