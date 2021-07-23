/* eslint-disable indent */
const {
    deleteFriend,
    getFriendshipStatus,
    getFriendsAndPending,
    getUserById,
    getLatestUserProfiles,
    getUserProfiles,
    saveFriendrequest,
    saveUser,
    saveNewPassword,
    getCodeByEmail,
    saveProfileUrl,
    saveUserBio,
    updateFriendstatus,
} = require("./database/db_queries");
const { loginUser, verifyEmail, sendRegistrationMail } = require("./functions");

const csrfToken = (request, response, next) => {
    response.cookie("myCsrfToken", request.csrfToken());
    next();
};

//FIND PROFILES
const findProfiles = async (request, response) => {
    const { q } = request.query;
    if (q.length < 3) {
        return;
    }
    try {
        const profiles = await getUserProfiles(q);
        if (profiles.length == 0) {
            console.log("...(findProfiles) No user Found!");
            response.status(404).json({ message: "No users found!" });
            return;
        }
        response.json(profiles);
    } catch (error) {
        console.log("ERROR fetching users: ", error);
        response.json({
            error: "Problem fetching users.",
        });
    }
};

//GET FRIENDS AND PENDING
const getFriendList = async (request, response) => {
    const { userId } = request.session;

    try {
        const list = await getFriendsAndPending({ userId });
        if (list.length == 0) {
            console.log("...(findProfiles) No Friends Found!");
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

//FIND LATEST PROFILES
const findLatestProfiles = async (request, response) => {
    try {
        const profiles = await getLatestUserProfiles();
        if (profiles.length == 0) {
            console.log("...(findProfiles) No user Found!");
            response.status(404).json({ message: "No users found!" });
        }
        response.json(profiles);
    } catch (error) {
        console.log("ERROR fetching most recent users: ", error);
        response.json({
            error: "Problem fetching most recent users.",
        });
    }
};

//GET FRIENDSHIP STATUS
const getFriendStatus = async (request, response) => {
    const { userId: user1_id } = request.session;
    const { user_id: user2_id } = request.params;
    try {
        const result = await getFriendshipStatus({ user1_id, user2_id });
        response.json({
            status: result.friend_status,
            sender: result.sender_id,
            recipient: result.recipient_id,
        });
    } catch (error) {
        console.log("Not a friend. userId: ", user2_id);
        response.json({ status: null });
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

//GET MY PROFILE
const getMyProfile = async (request, response) => {
    const { userId } = request.session;
    try {
        const user = await getUserById(userId);
        response.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_url: user.profile_url,
            bio: user.bio,
        });
    } catch (error) {
        console.log("ERROR fetching user profile: ", error);
        response.json({
            error: "Problem fetching user profile. ",
        });
    }
};

//GET USER PROFILE
const getUserProfile = async (request, response) => {
    const id = request.params.id;
    if (id == request.session.userId) {
        response.json({ self: true });
        return;
    }
    try {
        const user = await getUserById(id);
        if (!user) {
            console.log("no user found!");
            response.json(null);
            return;
        }
        response.json(user);
    } catch (error) {
        console.log("ERROR fetching user profile: ", error);
        response.json({
            error: "Problem fetching user profile. ",
        });
    }
};

//CHECK IF LOGGED IN
const checkLogin = (request, response) => {
    response.json({
        userId: request.session.userId,
    });
};

//LOGIN
const login = async (request, response) => {
    try {
        const user = await loginUser({ ...request.body });
        request.session.userId = user.id;
        response.json(user);
    } catch (error) {
        console.log("ERROR logging in: ", error);
        response.statusCode = 401;
        response.json({ error: "Login failed - wrong credentials!" });
    }
};

//LOGOUT
const logout = (request, response) => {
    request.session.userId = null;
    response.json({ message: "You've been logged out successfully!" });
};

//REGISTER
const register = async (request, response) => {
    try {
        const user = await saveUser({ ...request.body });
        request.session.userId = user.rows[0].id;
        response.statusCode = 200;
        sendRegistrationMail(user.rows[0]);
        response.json(user);
    } catch (error) {
        console.log("ERROR saving user with this email: ", error);
        response.json({
            error: "Problem saving user with this email.",
        });
    }
};

//PASSWORD  RESET
const resetPassword_step1 = async (request, response) => {
    try {
        const isVerified = await verifyEmail({ ...request.body });
        if (isVerified) {
            response.json({ isVerified: true });
            return;
        }
        response.statusCode = 400;
        response.json({
            error: "Verification failed - email not registered!",
        });
    } catch (error) {
        console.log("ERROR verifying email: ", error);
        response.statusCode(500).json({
            error: "Problem verifying email: " + error,
        });
    }
};
const resetPassword_step2 = async (request, response) => {
    try {
        const result = await getCodeByEmail({ ...request.body });
        if (result.secret_code == request.body.code) {
            try {
                const user = await saveNewPassword({ ...request.body });
                response.json({ user: user });
            } catch (error) {
                console.log("ERROR saving new password: ", error);
                response
                    .statusCode(500)
                    .json({ error: "Problem saving new password: " + error });
            }
        }
    } catch (error) {
        console.log("ERROR fetching secret code from database: ", error);
        response.statusCode(500).json({
            error: "Problem fetching secret code from database: " + error,
        });
    }
};

// SAVE NEW BIO
const saveNewBio = async (request, response) => {
    const { userId } = request.session;
    const { bio } = request.body;
    try {
        const result = await saveUserBio({ bio, userId });
        response.json(result);
    } catch (error) {
        console.log("ERROR saving user bio: ", error);
        response
            .statusCode(500)
            .json({ error: "Problem saving new bio: " + error });
    }
};

//UPLOAD PROFILE PICTURE
const saveProfilePictureUrl = async (request, response) => {
    try {
        const result = await saveProfileUrl({
            ...request.body,
            ...request.session,
        });
        response.json({ user: result });
    } catch (error) {
        console.log("ERROR in route handler saving profile picture: ", error);
        response
            .statusCode(500)
            .json({ error: "Problem saving profile picture: " + error });
    }
};

const exporting = {
    changeFriendStatus,
    checkLogin,
    csrfToken,
    getFriendList,
    findProfiles,
    findLatestProfiles,
    getFriendStatus,
    getMyProfile,
    getUserProfile,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
    saveNewBio,
    saveProfilePictureUrl,
};
module.exports = exporting;
