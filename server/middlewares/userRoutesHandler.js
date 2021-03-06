const {
    getFriendshipStatus,
    getPhotosById,
    getUserById,
    getLatestUserProfiles,
    getUserProfiles,
    getUserProfileDetailsById,
    saveUser,
    saveNewPassword,
    getCodeByEmail,
    saveProfileUrl,
    saveUserBio,
    updatePhotoById,
    updateUser,
    updateUserProfile,
} = require("../database/db_queries");

const { loginUser } = require("../additional/hashpassword");

const {
    verifyEmail,
    sendRegistrationMail,
    sendEditAccountMail,
} = require("../additional/mail");

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

//FIND LATEST PROFILES
const findLatestProfiles = async (request, response) => {
    try {
        const profiles = await getLatestUserProfiles();
        if (profiles.length == 0) {
            console.log("...(findLatestProfiles) No user Found!");
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

//GET MY PROFILE
const getMyProfile = async (request, response) => {
    const { userId } = request.session;
    console.log("getMyProfile userId: ", userId);
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
        try {
            const friendship = await getFriendshipStatus({
                user1_id: request.session.userId,
                user2_id: id,
            });
            response.json({ ...user, friendship: { ...friendship } });
        } catch (error) {
            console.log("ERROR fetching friendship info: ", error);
            response.json({ ...user, friendship: { status: null } });
        }
    } catch (error) {
        console.log("getUserProfile: ERROR fetching user profile: ", error);
        response.json({
            error: "Problem fetching user profile. ",
        });
    }
};
//GET USER PROFILE DETAILS
const getUserProfileDetails = async (request, response) => {
    const id = request.params.id;

    try {
        const userProfileDetails = await getUserProfileDetailsById(id);
        // console.log("userProfileDetails", userProfileDetails);
        if (!userProfileDetails) {
            console.log("no user found!");
            response.json(null);
            return;
        }
        response.json({ ...userProfileDetails });
    } catch (error) {
        console.log("ERROR fetching user profile: ", error);
        response.json({
            error: "Problem fetching user profile. ",
        });
    }
};

//UPDATE USER PROFILE DETAILS
const updateUserProfileDetails = async (request, response) => {
    const { userId } = request.session;
    const { inputValues } = request.body;
    console.log("...(RH updateUserProfileDetails) inputValues:", inputValues);
    try {
        const userProfile = await updateUserProfile({ userId, ...inputValues });
        console.log(
            "...(updateUserProfileDetails) userProfile: ",
            userProfile.rows[0]
        );
        response.json({
            userProfile: userProfile.rows[0],
        });
    } catch (error) {
        console.log("Problem updating userProfile: ", error);
        response.status(500).json({
            error,
        });
    }
};

//CHECK IF LOGGED IN
const checkLogin = (request, response) => {
    console.log("RH checklogin");
    if (request.session.userId) {
        response.json({
            userId: request.session.userId,
        });
        return;
    }
    response.json({
        userId: null,
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
        response
            .status(401)
            .json({ error: "Login failed - wrong credentials!" });
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
        // console.log("...(RH register) request.body: ", request.body);
        const user = await saveUser({ ...request.body });
        request.session.userId = user.rows[0].id;
        sendRegistrationMail(user.rows[0]);
        response.status(200).json(user);
    } catch (error) {
        console.log("ERROR saving user with this email: ", error);
        response.status(400).json({
            error: "Account with this email already exists.",
        });
    }
};

//EDIT ACCOUNT DETAILS
const editAccountDetails = async (request, response) => {
    try {
        console.log("...(RH editAccountDetails) request.body: ", request.body);
        const { id, first_name, email } = await getUserById(
            request.session.userId
        );
        const user = await updateUser({ id, ...request.body });
        //send email to old address in case email changed
        if (email != user.rows[0].email) {
            sendEditAccountMail({
                first_name,
                email,
                newmail: user.rows[0].email,
            });
        }
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
            console.log("VERIFIED!");
            response.json({
                message: "Email with verification code was sent!",
            });
            return;
        }
        response.statusCode = 400;
        response.json({
            error: "Verification failed - email not registered!",
        });
    } catch (error) {
        console.log("ERROR verifying email: ", error);
        response.status(500).json({
            error: "Problem verifying email: " + error,
        });
    }
};
const resetPassword_step2 = async (request, response) => {
    try {
        const secret_code = await getCodeByEmail({ ...request.body });
        // console.log("STEP 2: ", secret_code, request.body);
        if (secret_code == request.body.code) {
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
    console.log("...(RH saveProfilePictureUrl)");
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
const updateProfilePic = async (request, response) => {
    console.log("...(RH updateProfilePic)", request.body);
    //todo: url
    const { photo_url } = request.body;
    // console.log("...(RH updateProfilePic)", photo_url);

    const { userId } = request.session;

    try {
        const photo = await updatePhotoById({ userId, photo_url });
        // console.log("...(RH updateProfilePic)", photo);
        response.json({ photo });
    } catch (error) {
        response
            .statusCode(500)
            .json({ error: "Problem fetching photos: " + error });
    }
};

const getAllPhotosById = async (request, response) => {
    // console.log("...(RH getAllPhotosById) id: ", request.params.id);
    const id = request.params.id;
    try {
        const photos = await getPhotosById(id);
        // console.log("...(RH getAllPhotosById)", photos);
        response.json({ photos });
    } catch (error) {
        response
            .status(500)
            .json({ error: "Problem fetching photos: " + error });
    }
};

module.exports = {
    checkLogin,
    editAccountDetails,
    findProfiles,
    findLatestProfiles,
    getMyProfile,
    getAllPhotosById,
    getUserProfile,
    getUserProfileDetails,
    login,
    logout,
    register,
    resetPassword_step1,
    resetPassword_step2,
    saveNewBio,
    saveProfilePictureUrl,
    updateProfilePic,
    updateUserProfileDetails,
};
