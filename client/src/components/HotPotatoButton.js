//hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//redux
import {
    addRemovePotato,
    receivePotatoCount,
    receivePotatoButtonState,
} from "../redux/action-creator";

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
                    <span className="potatoCountMargin">{potatoCount} </span>
                    <span className="hideLabel">
                        {potatoCount == 1 ? ` Hot Potato` : ` Hot Potatoes`}
                    </span>
                </span>
            </button>
        </div>
    );
}
