//ACTION CREATOR
import axios from "../axios";

//For Friends and Pending Page
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
export const deleteFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=unfriend&user2_id=${otherUser_id}`)
            .then((data) => {
                //TODO action object: type property (e.g., 'DELETE_FRIENDSHIP') and the id
                console.log("...(ACTION CREATOR: unfriend) id: ", data);
                resolve({
                    type: "DELETE_FRIENDSHIP",
                    payload: otherUser_id,
                });
                reject({
                    type: "DELETE_FRIENDSHIP",
                    payload: null,
                });
            });
    });
};

export const cancelRequest = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=cancel&user2_id=${otherUser_id}`)
            .then((data) => {
                //TODO actio object: type property (e.g., 'CANCEL_REQUEST') and the id

                console.log("...(ACTION CREATOR: cancelRequest) id: ", data);
                resolve({
                    type: "CANCEL_REQUEST",
                    payload: otherUser_id,
                });
                reject({
                    type: "CANCEL_REQUEST",
                    payload: null,
                });
            });
    });
};

export const acceptFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=accept&user2_id=${otherUser_id}`)
            .then((data) => {
                //TODO action object: type property (e.g., 'ACCEPT_FRIENDSHIP') and the id
                console.log("...(ACTION CREATOR: acceptFriendship) id: ", data);
                resolve({
                    type: "ACCEPT_FRIENDSHIP",
                    payload: otherUser_id,
                });
                reject({
                    type: "ACCEPT_FRIENDSHIP",
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

//For FriendButton
// export const receiveFriendStatus = (otherUser_id) => {
//     return new Promise((resolve, reject) => {
//         axios.get(`/api/friendstatus/${otherUser_id}`).then((data) => {
//             resolve({
//                 type: "RECEIVE_FRIEND_STATUS",
//                 payload: data,
//             });
//             reject({
//                 type: "RECEIVE_FRIEND_STATUS",
//                 payload: null,
//             });
//         });
//     });
// };
