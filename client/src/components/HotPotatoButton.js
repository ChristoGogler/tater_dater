import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    addRemovePotato,
    receivePotatoCount,
    receivePotatoButtonState,
} from "../actions";

export default function HotPotatoButton(props) {
    const dispatch = useDispatch();
    // console.log("...(HotPotatoButton) props", props);
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
                className="btnPadding"
            >
                <span className="flex">
                    {potatoCount}
                    <i className="material-icons white">whatshot</i>
                </span>
            </button>
        </div>
    );
}
