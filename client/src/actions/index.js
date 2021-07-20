//ACTION CREATOR
import axios from "../axios";

export const receiveFriendsAndPending = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/friends").then((result) => {
            resolve({
                type: "RECEIVE_FRIENDS_PENDING",
                payload: result.data,
            });
            reject({
                type: "RECEIVE_FRIENDS_PENDING",
                payload: null,
            });
        });
    });
};

export const changeFriendpendingToggle = (friendpending_toggle) => {
    return {
        type: "CHANGE_FRIENDPENDING_TOGGLE",
        payload: !friendpending_toggle,
    };
};
