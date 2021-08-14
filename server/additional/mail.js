const exporting = {
    verifyEmail,
    sendEditAccountMail,
    sendRegistrationMail,
    sendVerificationMail,
};

module.exports = exporting;

const { getUserByEmail, saveSecretCode } = require("../database/db_queries");
const { sendEmail } = require("./SES");
const cryptoRandomString = require("crypto-random-string");

function verifyEmail({ email }) {
    console.log("...(verifyEmail) email: ", email);
    return getUserByEmail(email)
        .then((user) => {
            if (!user) {
                console.log("No User Found!");
                return Promise.resolve(false);
            }
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
    
    Cheers, Tater Dater`;
    saveSecretCode(email, secretCode)
        .then((result) => {
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

    const subject = `Hej ${first_name}, Welcome at (...Tater Dater...)!`;
    const body = `Dear ${first_name},
                Thanks for registering at (...Social Network...) :)`;

    sendEmail(email, body, subject);
}

function sendEditAccountMail({ email, first_name, newmail }) {
    console.log(
        "...(sendEditAccountMail) email, first_name: ",
        email,
        first_name
    );

    const subject = `Hej ${first_name}, youve changed your password!`;
    const body = `Dear ${first_name},
You have successfully changed your Email-Address to ${newmail} at (...Tater Dater...) :)`;
    sendEmail(email, body, subject);
}
