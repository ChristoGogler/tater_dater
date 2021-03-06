//ACTION CREATOR
import {
    UPDATE_FRIENDSHIP_STATUS,
    REQUEST_FRIENDSHIP,
    CANCEL_REQUEST,
    ACCEPT_FRIENDSHIP,
    DELETE_FRIENDSHIP,
    RECEIVE_FRIENDS_PENDING,
    CHANGE_FRIENDPENDING_TOGGLE,
    RECEIVE_PHOTOPICKER_GALLERY,
    IS_LIGHTBOX_VISIBLE,
    UPDATE_PHOTOPICKER_STARTEND,
    TOGGLE_ISUPLOADERVISIBLE,
    IS_LOADING,
    RECEIVE_RECENT_MESSAGES,
    SAVE_NEW_CHATMESSAGE,
    RECEIVE_OTHER_USER,
    UPDATE_OTHER_USER,
    RECEIVE_OTHER_USER_FRIENDS,
    FILTER_MUTUAL_FRIENDS,
    RECEIVE_POTATOCOUNT,
    RECEIVE_POTATOBUTTON,
    CHANGE_POTATOCOUNT,
    RESETPW_NEXTSTEP,
    UPDATE_USER,
    UPDATE_PROFILE_PIC,
    RECEIVE_USERPROFILE,
    CHANGE_BIOEDITOR,
    UPDATE_USERINPUT,
    TOGGLE_ISSEARCHING,
    RECEIVE_MOST_RECENT_USERS,
    RECEIVE_USER_SEARCH_RESULTS,
    TOGGLE_USER_PROFILE,
    UPDATE_USER_PROFILE,
} from "./actions";
import axios from "../axios";

//---FOR FRIENDS AND PENDING---//
export const receiveFriendsAndPending = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/friendship/friends").then((result) => {
            resolve({
                type: RECEIVE_FRIENDS_PENDING,
                payload: result.data,
            });
            reject({
                type: RECEIVE_FRIENDS_PENDING,
                payload: null,
            });
        });
    });
};
export const receiveOtherUserFriends = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/friendship/friends_by_id/${otherUser_id}`)
            .then((result) => {
                // console.log(
                //     "...(ACTIONS receiveOtherUserFriends) result: ",
                //     result
                // );

                resolve({
                    type: RECEIVE_OTHER_USER_FRIENDS,
                    payload: { friends: result.data },
                });
                reject({
                    type: RECEIVE_OTHER_USER_FRIENDS,
                    payload: { friends: null },
                });
            });
    });
};

export const filterMutualfriends = (myFriends, yourFriends) => {
    //Filter for mutual friends
    const mutualFriends = myFriends.filter((friendOfMe) => {
        return yourFriends.some((friendOfYou) => {
            return friendOfMe.id === friendOfYou.id;
        });
    });

    return {
        type: FILTER_MUTUAL_FRIENDS,
        payload: { mutualFriends },
    };
};

//TODO: has to get tested still
export const requestFriendship = (otherUser_id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `/api/friendship/request?action=request&user2_id=${otherUser_id}`
            )
            .then((friendship) => {
                // console.log(
                //     "...(ACTIONS requestFriendship) friendship: ",
                //     friendship
                // );
                resolve({
                    type: REQUEST_FRIENDSHIP,
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
                    type: REQUEST_FRIENDSHIP,
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
                    type: DELETE_FRIENDSHIP,
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: DELETE_FRIENDSHIP,
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
                    type: CANCEL_REQUEST,
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: CANCEL_REQUEST,
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
                // console.log("...(ACTION CREATOR: acceptFriendship) id: ", data);
                resolve({
                    type: ACCEPT_FRIENDSHIP,
                    payload: { otherUser_id },
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reject({
                    type: ACCEPT_FRIENDSHIP,
                    payload: { error },
                });
            });
    });
};

export const changeFriendpendingToggle = (friendpending_toggle) => {
    return {
        type: CHANGE_FRIENDPENDING_TOGGLE,
        payload: !friendpending_toggle,
    };
};

//---FOR CHAT---//
export const recentMessages = (messages) => {
    // console.log("...(ACTION recentMessages) messages: ", messages);
    return {
        type: RECEIVE_RECENT_MESSAGES,
        payload: { messages },
    };
};
export const newChatMessage = (message) => {
    // console.log("...(ACTION newChatMessage) message: ", message);

    return {
        type: SAVE_NEW_CHATMESSAGE,
        payload: message,
    };
};

//---FOR FRIENDBUTTON---//
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

//---FOR USER / BIOEDITOR / UserProfile---//
export const receiveOtherUser = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/user/info_by_id/${id}`).then((otherUser) => {
            // console.log("...(ACTION receiveOtherUser) otherUser: ", otherUser);
            resolve({
                type: RECEIVE_OTHER_USER,
                payload: { otherUser: otherUser.data },
            });
            reject({
                type: RECEIVE_OTHER_USER,
                payload: null,
            });
        });
    });
};

export const addFriendshipStatusToOtherUser = async (id) => {
    const friendship = await axios.get(`/api/friendship/status/${id}`);
    // console.log("...(ACTION) friendship:", friendship);
    return {
        type: UPDATE_OTHER_USER,
        payload: { friendship: friendship.data },
    };
};

export const changeFriendshipStatus = (status) => {
    // console.log("...(ACTION changeFriendshipStatus) status: ", status);
    return {
        type: UPDATE_FRIENDSHIP_STATUS,
        payload: { status },
    };
};

export const saveBio = async (bio) => {
    const user = await axios.put("/api/user/update/info", {
        bio,
    });
    // console.log("...(ACTION saveBio) user: ", user.data);

    return {
        type: UPDATE_USER,
        payload: user.data,
    };
};

export const toggleBioEditor = (isBeingEdited) => {
    return {
        type: CHANGE_BIOEDITOR,
        payload: isBeingEdited,
    };
};

export const getUser = async () => {
    const user = await axios.get("/api/user/info", {});
    return {
        type: UPDATE_USER,
        payload: user.data,
    };
};

export const onUserInputChange = (input) => {
    // console.log("...(ACTIONS onUserInputChange) input: ", input);
    return {
        type: UPDATE_USERINPUT,
        payload: { input },
    };
};

export const updateAccount = async (editAccountInput) => {
    // console.log(
    //     "...(ACTIONS updateAccount) editAccountInput: ",
    //     editAccountInput
    // );
    const user = await axios.put("/api/user/update/account", editAccountInput);
    // console.log("...(ACTIONS updateAccount) user: ", user.data.rows[0]);
    return {
        type: UPDATE_USER,
        payload: user.data.rows[0],
    };
};

export const updateProfilePic = async (formData) => {
    const user = await axios.post("/api/user/uploadphoto", formData);
    return {
        type: UPDATE_USER,
        payload: user.data.user,
    };
};

export const setNewProfilePhoto = async (photo_url) => {
    // console.log("...(ACTIONS setNewProfilePhoto) photo_url: ", photo_url);
    const photo = await axios.post("/api/user/setprofilepic", { photo_url });
    // console.log("...(ACTIONS setNewProfilePhoto) photo: ", photo);

    return {
        type: UPDATE_PROFILE_PIC,
        payload: { photo: photo.data.photo.profile_url },
    };
};

export const receivePhotoPickerGallery = async (id) => {
    const photos = await axios.get(`/api/user/gallery/${id}`);

    return {
        type: RECEIVE_PHOTOPICKER_GALLERY,
        payload: { photos: photos.data.photos },
    };
};
export const setPhotoPicker = (
    start,
    end,
    direction,
    length,
    picturesPerPage
) => {
    // console.log("...(ACTIONS setPhotoPicker) start/end: ", start, end);
    // const PICTURES_PER_PAGE = 4;
    if (direction) {
        start += picturesPerPage;
        end += picturesPerPage;
    } else {
        start -= picturesPerPage;
        end -= picturesPerPage;
    }
    let hidePrev, hideNext;
    if (start < 1) {
        hidePrev = true;
    } else {
        hidePrev = false;
    }
    if (end >= length) {
        hideNext = true;
    } else {
        hideNext = false;
    }
    return {
        type: UPDATE_PHOTOPICKER_STARTEND,
        payload: {
            startEnd: {
                start,
                end,
                hidePrev,
                hideNext,
                direction,
                length,
                picturesPerPage,
            },
        },
    };
};

export const toggleLightboxVisible = (isVisible) => {
    return {
        type: IS_LIGHTBOX_VISIBLE,
        payload: { isVisible: !isVisible },
    };
};

//---FOR RESET PASSWORD---//
export const resetPwNextStep = async (step, resetPwInput) => {
    if (step == 1) {
        try {
            const response = await axios.post(
                "/api/user/password/reset/step1",
                resetPwInput
            );
            console.log(
                "...(resetPassword) step 1, message: ",
                response.data.message
            );
            return {
                type: RESETPW_NEXTSTEP,
                payload: { message: response.data.message, step: 2 },
            };
        } catch (error) {
            console.log("...(resetPassword) step 1, error: ", error);
        }
    }
    if (step == 2) {
        try {
            const response = await axios.post(
                "/api/user/password/reset/step2",
                resetPwInput
            );
            console.log(
                "...(resetPassword) step 2, message: ",
                response.data.message
            );

            return {
                type: RESETPW_NEXTSTEP,
                payload: { message: response.data.message, step: 3 },
            };
        } catch (error) {
            console.log("...(resetPassword) step 2, error: ", error);
        }
    }
};

//---FOR FINDPROFILE---//
export const receiveMostRecentUsers = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/user/latest").then((mostRecentUsers) => {
            // console.log(
            //     "...(ACTIONS receiveMostRecentUsers) mostRecentUsers: ",
            //     mostRecentUsers
            // );
            resolve({
                type: RECEIVE_MOST_RECENT_USERS,
                payload: { mostRecentUsers: mostRecentUsers.data },
            });
            reject({
                type: RECEIVE_MOST_RECENT_USERS,
                payload: null,
            });
        });
    });
};

export const receiveUserSearchResults = async (searchquery) => {
    try {
        const userResults = await axios.get(`/api/user/find?q=${searchquery}`);
        console.log(
            "...(ACTIONS getUserSearchResults) userResults.data: ",
            userResults.data
        );
        return {
            type: RECEIVE_USER_SEARCH_RESULTS,
            payload: { userResults: userResults.data },
        };
    } catch (error) {
        return {
            type: RECEIVE_USER_SEARCH_RESULTS,
            payload: { userResults: [] },
        };
    }
};

export const toggleIsSearching = (isSearching) => {
    return {
        type: TOGGLE_ISSEARCHING,
        payload: { isSearching },
    };
};

export const toggleUploaderVisible = (isVisible) => {
    return {
        type: TOGGLE_ISUPLOADERVISIBLE,
        payload: { isVisible },
    };
};

export const stillLoading = (isLoading) => {
    return {
        type: IS_LOADING,
        payload: { isLoading },
    };
};

//---POTATOES---//

export const receivePotatoCount = async (user_id) => {
    const potatoCount = await axios.get(
        `/api/potato/allpotatoes_by_id/${user_id}`
    );
    // console.log(
    //     "...(ACTION receivePotatoCount) potatoCount:",
    //     potatoCount.data
    // );
    return {
        type: RECEIVE_POTATOCOUNT,
        payload: { potatoCount: potatoCount.data },
    };
};

export const addRemovePotato = async (addPotato, user_id) => {
    // console.log(
    //     "...(ACTION addRemovePotato)addPotato, user_id: ",
    //     addPotato,
    //     user_id
    // );
    await axios.post(
        `/api/potato/addpotato?action=${addPotato}&user2_id=${user_id}`
    );
    let number;
    let toggleState;
    if (addPotato) {
        number = -1;
        toggleState = false;
    } else {
        number = 1;
        toggleState = true;
    }
    return {
        type: CHANGE_POTATOCOUNT,
        payload: { number, toggleState },
    };
};
export const receivePotatoButtonState = async (user_id) => {
    const potatoButtonState = await axios.get(
        `/api/potato/potato_by_id/${user_id}`
    );
    // console.log(
    //     "...(ACTION receivePotatoButtonState) potatoButtonState:",
    //     potatoButtonState.data.hasGivenPotato
    // );
    return {
        type: RECEIVE_POTATOBUTTON,
        payload: { potatoButtonState: potatoButtonState.data.hasGivenPotato },
    };
};
export const receiveUserprofile = async (user_id) => {
    const userProfile = await axios.get(`/api/user/profile/${user_id}`);
    // console.log(
    //     "...(ACTION receiveUserprofile) userProfile.data:",
    //     userProfile.data
    // );
    return {
        type: RECEIVE_USERPROFILE,
        payload: { userProfile: userProfile.data },
    };
};

export const toggleUserProfile = (isBeingEdited) => {
    return {
        type: TOGGLE_USER_PROFILE,
        payload: isBeingEdited,
    };
};

export const updateProfileDetails = async (inputValues) => {
    console.log("...(updateProfileDetails) inputValues: ", inputValues);
    const userProfile = await axios.put("/api/user/update/profile", {
        inputValues,
    });
    return {
        type: UPDATE_USER_PROFILE,
        payload: { userProfile: userProfile.data.userProfile },
    };
};
