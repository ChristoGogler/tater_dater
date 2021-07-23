/* eslint-disable indent */
// Reducer

const initialState = {
    friendsAndPending: [],
    chatHistory: [],
    newMessages: [],
};

const reducer = (state = initialState, action) => {
    let updatedFriendsAndPending;

    switch (action.type) {
        case "RECEIVE_FRIENDS_PENDING":
            return { ...state, friendsAndPending: action.payload };

        case "CHANGE_FRIENDPENDING_TOGGLE":
            return { ...state, friendpending_toggle: action.payload };

        //currently not used, has to still get tested
        case "REQUEST_FRIENDSHIP":
            updatedFriendsAndPending = addAsFriend(state, action);
            return {
                ...state,
                friendsAndPending: [
                    ...state.friendsAndPending,
                    action.payload.user,
                ],
            };

        case "DELETE_FRIENDSHIP":
            updatedFriendsAndPending = removeFromList(state, action);
            return { ...state, friendsAndPending: updatedFriendsAndPending };

        case "CANCEL_REQUEST":
            updatedFriendsAndPending = removeFromList(state, action);
            return { ...state, friendsAndPending: updatedFriendsAndPending };

        case "ACCEPT_FRIENDSHIP":
            updatedFriendsAndPending = addAsFriend(state, action);
            return { ...state, friendsAndPending: updatedFriendsAndPending };

        case "RECEIVE_FRIEND_STATUS":
            return {
                ...state,
                friendButton: [{ friend_status: action.payload }],
            };

        case "RECENT_MESSAGES":
            console.log(
                "...(Reducer RECENT_MESSAGES) action.payload: ",
                action.payload.messages
            );
            return { ...state, chatHistory: action.payload.messages };

        case "NEW_CHATMESSAGE":
            console.log(
                "...(Reducer RECENT_MESSAGES) action.payload: ",
                action.payload
            );
            return {
                ...state,
                newMessages: [...state.newMessages, action.payload],
            };
        default:
            return state;
    }
};

const addAsFriend = (state, action) => {
    return state.friendsAndPending.map((user) => {
        if (user.id == action.payload.otherUser_id) {
            user.friend_status = "friends";
        }
        return user;
    });
};
const removeFromList = (state, action) => {
    return state.friendsAndPending.filter(
        ({ id }) => id != action.payload.otherUser_id
    );
};

export default reducer;
