/* eslint-disable indent */

const {
    deleteFriend,
    getFriendshipStatus,
    getFriendsAndPending,
    getFriendsById,
    saveFriendrequest,
    updateFriendstatus,
} = require("../database/db_queries");

//GET FRIENDS AND PENDING
const getFriendList = async (request, response) => {
    const { userId } = request.session;

    try {
        const list = await getFriendsAndPending({ userId });
        if (list.length == 0) {
            console.log("...(getFriendList) No Friends Found!");
            response.status(404).json({ message: "No Friends found!" });
            return;
        }
        // console.log("...(RH getFriendsList) result: ", list);
        response.json(list);
    } catch (error) {
        console.log("ERROR fetching friends and pending: ", error);
        response.json({
            error: "Problem fetching friends and pending.",
        });
    }
};

//GET OTHER USER FRIENDS
const getFriendListById = async (request, response) => {
    const { id } = request.params;
    // console.log("...(RH getFriendListById) id: ", id);

    try {
        const list = await getFriendsById({ id });
        if (list.length == 0) {
            console.log("...(getFriendListById) No Friends Found!");
            response.status(404).json({ message: "No Friends found!" });
            return;
        }
        // console.log("...(RH getFriendsList) result: ", list);
        response.json(list);
    } catch (error) {
        console.log("ERROR fetching friends and pending: ", error);
        response.json({
            error: "Problem fetching friends and pending.",
        });
    }
};

//GET FRIENDSHIP STATUS
const getFriendStatus = async (request, response) => {
    const { userId: user1_id } = request.session;
    const { user_id: user2_id } = request.params;
    console.log("request.params:", request.params);
    try {
        console.log(user1_id, user2_id);
        const result = await getFriendshipStatus({ user1_id, user2_id });
        // console.log("RH: friendship:", result);
        response.json({
            status: result.friend_status,
            sender: result.sender_id,
            recipient: result.recipient_id,
        });
    } catch (error) {
        console.log("RH: Not a friend. userId: ", user2_id);
        response.json({
            status: null,
        });
    }
};

//CHANGE FRIEND STATUS
const changeFriendStatus = async (request, response) => {
    console.log("...(RH: changeFriendStatus)");
    const { userId: user1_id } = request.session;
    const { action, user2_id } = request.query;
    let updatedFriendship;
    try {
        switch (action) {
            case "request":
                updatedFriendship = await saveFriendrequest({
                    user1_id,
                    user2_id,
                });
                break;
            case "accept":
                updatedFriendship = await updateFriendstatus({
                    user1_id,
                    user2_id,
                    friend_status: "friends",
                });
                break;
            case "cancel":
                updatedFriendship = await deleteFriend({ user1_id, user2_id });
                break;
            case "unfriend":
                updatedFriendship = await deleteFriend({ user1_id, user2_id });
                break;
            default:
                break;
        }
        response.json({
            status: updatedFriendship.friend_status,
            sender: updatedFriendship.sender_id,
            recipient: updatedFriendship.recipient_id,
        });
    } catch (error) {
        console.log("ERROR updating friendship status: ", error);
        response.json({
            error: "Problem updating friendship status.",
        });
    }
};

module.exports = {
    getFriendList,
    getFriendListById,
    getFriendStatus,
    changeFriendStatus,
};
