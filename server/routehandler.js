const {
    deleteFriend,
    getFriendshipStatus,
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
} = require("./db_queries");
const { loginUser, verifyEmail, sendRegistrationMail } = require("./functions");

const csrfToken = (request, response, next) => {
    response.cookie("myCsrfToken", request.csrfToken());
    next();
};

//FIND PROFILES
const findProfiles = async (request, response) => {
    const { q } = request.query;
    console.log("...(findProfiles) q.length: ", q.length);
    if (q.length < 3) {
        return;
    }
    const profiles = await getUserProfiles(q);
    console.log("...(findProfiles) result", profiles);
    if (profiles.length == 0) {
        console.log("...(findProfiles) No user Found!");
        response.status(404).json({ message: "No users found!" });
    }
    response.json(profiles);
};

//FIND LATEST PROFILES
const findLatestProfiles = async (request, response) => {
    const profiles = await getLatestUserProfiles();
    console.log("...(findLatestProfiles) result: ", profiles);
    if (profiles.length == 0) {
        console.log("...(findProfiles) No user Found!");
        response.status(404).json({ message: "No users found!" });
    }
    response.json(profiles);
};

//GET FRIENDSHIP STATUS
const getFriendStatus = async (request, response) => {
    const { userId: user1_id } = request.session;
    const { user_id: user2_id } = request.params;
    try {
        const result = await getFriendshipStatus({ user1_id, user2_id });
        console.log("...(RH: getFriendStatus) result: ", result.friend_status);
        response.json({
            status: result.friend_status,
            sender: result.sender_id,
            recipient: result.recipient_id,
        });
    } catch (error) {
        response.json({ status: null });
    }
};

//CHANGE FRIEND STATUS
const changeFriendStatus = async (request, response) => {
    console.log("...(RH: changeFriendStatus)");
    const { userId: user1_id } = request.session;
    const { action, user2_id } = request.query;
    console.log(action, user1_id, user2_id);
    let result;
    switch (action) {
        case "request":
            result = await saveFriendrequest({ user1_id, user2_id });
            break;
        case "accept":
            result = await updateFriendstatus({
                user1_id,
                user2_id,
                friend_status: "friends",
            });
            break;
        case "cancel":
            result = await deleteFriend({ user1_id, user2_id });
            break;
        case "unfriend":
            result = await deleteFriend({ user1_id, user2_id });
            break;
        default:
            break;
    }
    response.json({
        status: result.friend_status,
        sender: result.sender_id,
        recipient: result.recipient_id,
    });
};

//GET MY PROFILE
const getMyProfile = (request, response) => {
    const { userId } = request.session;
    getUserById(userId).then((user) => {
        console.log("...(GET /api/user) USER: ", user);
        response.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_url: user.profile_url,
            bio: user.bio,
        });
    });
};

//GET USER PROFILE
const getUserProfile = async (request, response) => {
    console.log("...(GET /api/user/:id)", request.params.id);
    const id = request.params.id;
    if (id == request.session.userId) {
        response.json({ self: true });
        return;
    }
    const user = await getUserById(id);
    console.log("...(GET /api/user/:id) otherUser: ", user);
    if (!user) {
        console.log("no user found!");
        response.json(null);
        return;
    }
    response.json(user);
};

//CHECK IF LOGGED IN
const checkLogin = (request, response) => {
    console.log("...(GET /user/id.json) request.session: ", request.session);
    response.json({
        userId: request.session.userId,
    });
};

//LOGIN
const login = (request, response) => {
    console.log("...(POST /api/login) request.body: ", request.body);
    loginUser({ ...request.body })
        .then((user) => {
            //TODO
            console.log("...(POST / api / login) user: ", user);
            request.session.userId = user.id;
            response.json(user);
        })
        .catch((error) => {
            console.log("Error POST /api/login: ", error);
            response.statusCode = 400;
            response.json({ error: "Login failed - wrong credentials!" });
        });
};

//LOGOUT
const logout = (request, response) => {
    console.log("...(POST /api/logout) request: ", request.body);
    request.session.userId = null;
    console.log("...(POST /api/logout) userId after: ", request.session.userId);
    response.json({ message: "You've been logged out successfully!" });
};

//REGISTER
const register = (request, response) => {
    console.log("...(POST /api/register) request.body: ", request.body);
    saveUser({ ...request.body })
        .then((user) => {
            request.session.userId = user.rows[0].id;
            response.statusCode = 200;
            sendRegistrationMail(user.rows[0]);
            response.json(user);
        })
        .catch((error) => {
            console.log("Error...blabla: ", error);
            response.statusCode = 400;
            response.json({
                error: "There already exists an account with this email.",
            });
        });
};

//PASSWORD  RESET
const resetPassword_step1 = (request, response) => {
    console.log("...(POST /password/reset/step1)");
    verifyEmail({ ...request.body }).then((isVerified) => {
        if (isVerified) {
            response.json({ isVerified: true });
            return;
        }
        response.statusCode = 400;
        response.json({ error: "Verification failed - email not registered!" });
    });
};
const resetPassword_step2 = (request, response) => {
    console.log("...(POST /password/reset/step2)");
    getCodeByEmail({ ...request.body }).then((result) => {
        console.log(
            "Code, request.body",
            result.secret_code,
            request.body.code
        );
        if (result.secret_code == request.body.code) {
            saveNewPassword({ ...request.body }).then((user) => {
                response.json({ user: user });
            });
        }
    });
};

// SAVE NEW BIO
const saveNewBio = (request, response) => {
    console.log("...(PUT /api/user/update/bio)", request.body);
    const { userId } = request.session;
    const { bio } = request.body;
    saveUserBio({ bio, userId })
        .then((result) => {
            console.log("...(PUT /api/user/update/bio) result: ", result);
            response.json(result);
        })
        .catch((error) => {
            console.log("Error saving user bio: ", error);
        });
};

//UPLOAD PROFILE PICTURE
const saveProfilePictureUrl = (request, response) => {
    console.log("...(POST /api/upload) request.file: )", request.file);
    // console.log("...(POST /api/upload)) response: ", response);
    saveProfileUrl({ ...request.body, ...request.session }).then((result) => {
        console.log("...(POST api/upload saveProfileUrl) result: ", result);
        response.json({ user: result });
        return;
    });
};

const exporting = {
    changeFriendStatus,
    checkLogin,
    csrfToken,
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
