/* eslint-disable indent */
// Reducer

const friendshipReducer = (state = {}, action) => {
    let updated;
    switch (action.type) {
        case "RECEIVE_FRIENDS_PENDING":
            return { ...state, friendsAndPending: action.payload };
        case "CHANGE_FRIENDPENDING_TOGGLE":
            return { ...state, friendpending_toggle: action.payload };
        case "DELETE_FRIENDSHIP":
            updated = state.friendsAndPending.filter(
                ({ id }) => id != action.payload
            );
            return { ...state, friendsAndPending: updated };
        case "CANCEL_REQUEST":
            updated = state.friendsAndPending.filter(
                ({ id }) => id != action.payload
            );
            return { ...state, friendsAndPending: updated };
        case "ACCEPT_FRIENDSHIP":
            updated = state.friendsAndPending.map((x) => {
                if (x.id == action.payload) {
                    x.friend_status = "friends";
                }
                return x;
            });
            return { ...state, friendsAndPending: updated };
        // case "REQUEST_FRIENDSHIP":
        //     return { ...state, friendsAndPending: action.payload };
        case "RECEIVE_FRIEND_STATUS":
            return {
                ...state,
                friendButton: [{ friend_status: action.payload }],
            };
        default:
            return state;
    }
};

export default friendshipReducer;
