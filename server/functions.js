const exporting = {
    changeDateToTimepast,
    hashPassword,
    loginUser,
    verifyEmail,
    sendRegistrationMail,
    sendVerificationMail,
    saveToDb,
};

module.exports = exporting;

const { genSalt, hash, compare } = require("bcryptjs");
const {
    getUserByEmail,
    saveSecretCode,
    saveProfileUrl,
} = require("./database/db_queries");
const { sendEmail } = require("./SES");
const cryptoRandomString = require("crypto-random-string");
const moment = require("moment");

function hashPassword(password) {
    console.log("...(hashPassword) password: ", password);
    return genSalt().then((salt) => {
        return hash(password, salt);
    });
}

function loginUser({ email, password }) {
    console.log("...(loginUser) email, password: ", email, password);
    return getUserByEmail(email).then((user) => {
        console.log("...(loginUser) user: ", user);
        if (!user) {
            console.log("no user!");
            //do send error message - wrong credentials
            return Promise.resolve(null);
        }
        // console.log("password hash: ", user.password_hash);
        return compare(password, user.password_hash).then((same) => {
            if (!same) {
                console.log("Passwords dont match!");
                return null;
            }
            console.log("Found User: ", user);
            return user;
        });
    });
}

function verifyEmail({ email }) {
    console.log("...(verifyEmail) email: ", email);
    return getUserByEmail(email)
        .then((user) => {
            if (!user) {
                console.log("No User Found!");
                return Promise.resolve(false);
            }
            console.log("user: ", user);
            sendVerificationMail(user);
            return true;
        })
        .catch((error) => {
            console.log("ERROR verifying email: ", error);
        });
}

function sendVerificationMail({ email, first_name }) {
    console.log("...(createVerificationCode) email: ", email, first_name);
    const secretCode = cryptoRandomString({
        length: 6,
    });
    const subject = `Password Reset Verification Code!`;
    const body = `Dear ${first_name},
    you have recently requested a verification code to reset your password!
    Please copy this code into the textfield on the password reset page.
    Verification code: ${secretCode}
    
    Cheers, Christo`;
    saveSecretCode(email, secretCode)
        .then((result) => {
            console.log(
                "...(sendVerificationCode), saveSecretCode -> result: ",
                result
            );
            sendEmail(email, body, subject);
        })
        .catch((error) => {
            console.log("ERROR: sending verification mail! ", error);
        });
}

function sendRegistrationMail({ email, first_name }) {
    console.log(
        "...(sendRegistrationMail) email, first_name: ",
        email,
        first_name
    );

    const subject = `Hej ${first_name}, Welcome at (...Social Network...)!`;
    const body = `Dear ${first_name},
            Thanks for registering at (...Social Network...) :)`;
    sendEmail(email, body, subject);
}

//saveToDb
//middleware
function saveToDb(request, response, next) {
    console.log("...(server saveToDb)");
    saveProfileUrl(request.body).then((result) => {
        request.latestImage = result;
        next();
    });
}

function changeDateToTimepast(result) {
    result.rows.forEach((comment) => {
        comment.created_at = moment(comment.created_at).fromNow();
    });
}
