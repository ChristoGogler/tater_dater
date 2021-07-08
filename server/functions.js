const exporting = {
    hashPassword,
};

module.exports = exporting;

const { genSalt, hash, compare } = require("bcryptjs");

function hashPassword(password) {
    console.log("...(hashPassword) password: ", password);
    return genSalt().then((salt) => {
        return hash(password, salt);
    });
}
