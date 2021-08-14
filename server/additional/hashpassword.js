const { genSalt, hash, compare } = require("bcryptjs");
const { getUserByEmail } = require("../database/db_queries");

function hashPassword(password) {
    console.log("...(hashPassword");
    return genSalt().then((salt) => {
        return hash(password, salt);
    });
}

function loginUser({ email, password }) {
    console.log("...(loginUser) email: ", email);
    return getUserByEmail(email).then((user) => {
        if (!user) {
            console.log("no user!");
            //do send error message - wrong credentials
            return Promise.resolve(null);
        }
        const { id, first_name, last_name, email, profile_url, bio } = user;
        return compare(password, user.password_hash).then((same) => {
            if (!same) {
                console.log("Passwords dont match!");
                return null;
            }
            console.log("Found User: ", user);
            return { id, first_name, last_name, email, profile_url, bio };
        });
    });
}

module.exports = { hashPassword, loginUser };
