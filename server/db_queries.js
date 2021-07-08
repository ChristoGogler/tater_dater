const exporting = {
    getUserById,
    saveUser,
};
module.exports = exporting;

const spicedpg = require("spiced-pg");
const { hashPassword } = require("./functions");

const user = process.env.user || require("./secrets.json").user;
const pwd = process.env.pwd || require("./secrets.json").pwd;
const database = "socialnetwork";

const postgresDb =
    spicedpg(process.env.DATABASE_URL) ||
    spicedpg(`postgres:${user}:${pwd}@localhost:5432/${database}`);

console.log(`Connecting to ${database}...!`);

function getUserById(id) {
    return postgresDb.query("SELECT * FROM users WHERE id = $1", [id]);
}

function saveUser({ first_name, last_name, email, password }) {
    return hashPassword(password).then((password_hash) => {
        return postgresDb.query(
            "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ( $1, $2, $3, $4)",
            [first_name, last_name, email, password_hash]
        );
    });
}
