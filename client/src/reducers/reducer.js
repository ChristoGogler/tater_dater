/* eslint-disable indent */
// Reducer

const initialState = {
    user: {},
    otherUser: {},
    friendsAndPending: [],
    otherUserFriends: [],
    mutualFriends: [],
    photoPickerGallery: [],
    chatHistory: [],
    newMessages: [],
    bioEditor: { isBeingEdited: false },
    isSearching: false,
    resetPassword: { step: 1 },
    mostRecentUsers: [],
    userSearchResults: [],
    isUploaderVisible: false,
    loading: true,
    isLightboxVisible: false,
    photoPicker: {
        start: 0,
        end: 0,
        hidePrev: true,
        hideNext: false,
        direction: true,
        length: 1,
        picturesPerPage: 1,
    },
    userInput: {},
    potatoCount: 0,
    potatoButtonState: true,
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
        case "UPDATE_FRIENDSHIP_STATUS":
            return {
                ...state,
                otherUser: {
                    ...state.otherUser,
                    friendship: {
                        ...state.otherUser.friendship,
                        friend_status: action.payload.status,
                    },
                },
            };

        case "RECENT_MESSAGES":
            return { ...state, chatHistory: action.payload.messages };

        case "NEW_CHATMESSAGE":
            return {
                ...state,
                newMessages: [...state.newMessages, action.payload],
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        case "UPDATE_PROFILE_PIC":
            return {
                ...state,
                user: { ...state.user, profile_url: action.payload.photo },
            };
        case "UPDATE_PHOTOPICKER_STARTEND":
            return {
                ...state,
                photoPicker: action.payload.startEnd,
            };
        case "CHANGE_BIOEDITOR":
            return {
                ...state,
                bioEditor: { isBeingEdited: action.payload.isBeingEdited },
            };
        case "TOGGLE_ISSEARCHING":
            return {
                ...state,
                isSearching: action.payload.isSearching,
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload.user,
            };
        case "RESETPW_NEXTSTEP":
            return {
                ...state,
                resetPassword: {
                    step: action.payload.step,
                    message: action.payload.message,
                },
            };
        case "GET_MOST_RECENT_USERS":
            return {
                ...state,
                mostRecentUsers: action.payload.mostRecentUsers,
            };
        case "GET_USER_SEARCH_RESULTS":
            return {
                ...state,
                userSearchResults: action.payload.userSearchResults,
            };
        case "TOGGLE_ISUPLOADERVISIBLE":
            return {
                ...state,
                isUploaderVisible: action.payload.isVisible,
            };
        case "IS_LOADING":
            return {
                ...state,
                loading: action.payload.isLoading,
            };
        case "RECEIVE_OTHER_USER":
            return {
                ...state,
                otherUser: action.payload.otherUser,
            };
        case "UPDATE_OTHER_USER":
            return {
                ...state,
                otherUser: { ...state.otherUser, ...action.payload },
            };
        case "IS_LIGHTBOX_VISIBLE":
            return {
                ...state,
                isLightboxVisible: action.payload.isVisible,
            };
        case "RECEIVE_OTHER_USER_FRIENDS":
            return {
                ...state,
                otherUserFriends: action.payload.friends,
            };
        case "GET_MUTUAL_FRIENDS":
            return {
                ...state,
                mutualFriends: action.payload.mutualFriends,
            };
        case "RECEIVE_PHOTOPICKER_GALLERY":
            return {
                ...state,
                photoPickerGallery: action.payload.photos,
            };
        case "UPDATE_USERINPUT":
            return {
                ...state,
                userInput: { ...state.userInput, ...action.payload.input },
            };
        case "CHANGE_POTATOCOUNT":
            return {
                ...state,
                potatoButtonState: action.payload.toggleState,
                potatoCount: state.potatoCount - action.payload.number,
            };
        case "RECEIVE_POTATOCOUNT":
            return {
                ...state,
                potatoCount: action.payload.potatoCount,
            };
        case "RECEIVE_POTATOBUTTON":
            return {
                ...state,
                potatoButtonState: action.payload.potatoButtonState,
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
