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

//TODO: has to get tested still
export const requestFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=request&user2_id=${otherUser_id}`)
            .then((friendship) => {
                console.log(
                    "...(ACTIONS requestFriendship) friendship: ",
                    friendship
                );
                resolve({
                    type: "REQUEST_FRIENDSHIP",
                    payload: {
                        id: friendship.id,
                        first_name: friendship.first_name,
                        last_name: friendship.last_name,
                        profile_url: friendship.profile_url,
                        friend_status: friendship.friend_status,
                        sender_id: friendship.sender_id,
                    },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "REQUEST_FRIENDSHIP",
                    payload: { error },
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
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "DELETE_FRIENDSHIP",
                    payload: { error },
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
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "CANCEL_REQUEST",
                    payload: { error },
                });
            });
    });
};

export const acceptFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/friendrequest?action=accept&user2_id=${otherUser_id}`)
            .then((data) => {
                console.log("...(ACTION CREATOR: acceptFriendship) id: ", data);
                resolve({
                    type: "ACCEPT_FRIENDSHIP",
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: "ACCEPT_FRIENDSHIP",
                    payload: { error },
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
    console.log("...(ACTION recentMessages) messages: ", messages);
    return {
        type: "RECENT_MESSAGES",
        payload: messages,
    };
};
export const newChatMessage = (message) => {
    console.log("...(ACTION newChatMessage) message: ", message);

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
