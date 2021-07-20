// Reducer

const friendshipReducer = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_FRIENDS_PENDING":
            return { ...state, friendsAndPending: action.payload };
        case "CHANGE_FRIENDPENDING_TOGGLE":
            return { ...state, friendpending_toggle: action.payload };
        default:
            return state;
    }
};

export default friendshipReducer;
