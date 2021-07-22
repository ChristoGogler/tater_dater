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

export const requestFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=request&user2_id=${otherUser_id}`)
            .then((data) => {
                console.log("...(ACTIONS requestFriendship) data: ", data);
                resolve({
                    type: "REQUEST_FRIENDSHIP",
                    payload: otherUser_id,
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "REQUEST_FRIENDSHIP",
                    payload: error,
                });
            });
    });
};

export const deleteFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=unfriend&user2_id=${otherUser_id}`)
            .then(() => {
                resolve({
                    type: "DELETE_FRIENDSHIP",
                    payload: otherUser_id,
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "DELETE_FRIENDSHIP",
                    payload: error,
                });
            });
    });
};

export const cancelRequest = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=cancel&user2_id=${otherUser_id}`)
            .then(() => {
                // console.log("...(ACTION CREATOR: cancelRequest) id: ", data);
                resolve({
                    type: "CANCEL_REQUEST",
                    payload: otherUser_id,
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "CANCEL_REQUEST",
                    payload: error,
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
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "ACCEPT_FRIENDSHIP",
                    payload: error,
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

//For Chat
export const recentMessages = (messages) => {
    return {
        type: "RECENT_MESSAGES",
        payload: messages,
    };
};
export const newChatMessage = (message) => {
    return {
        type: "NEW_CHATMESSAGE",
        payload: message,
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
