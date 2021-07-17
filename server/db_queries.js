const exporting = {
    deleteFriend,
    getFriendshipStatus,
    getUserByEmail,
    getUserById,
    getLatestUserProfiles,
    getUserProfiles,
    saveFriendrequest,
    saveUser,
    saveNewPassword,
    saveSecretCode,
    getCodeByEmail,
    saveProfileUrl,
    saveUserBio,
    updateFriendstatus,
};
module.exports = exporting;

const spicedpg = require("spiced-pg");
const { hashPassword } = require("./functions");

const user = process.env.user || require("./secrets.json").user;
const pwd = process.env.pwd || require("./secrets.json").pwd;
const database = "socialnetwork";

const postgresDb =
    // spicedpg(process.env.DATABASE_URL) ||
    spicedpg(`postgres:${user}:${pwd}@localhost:5432/socialnetwork`);

console.log(`DataBase: Connecting to ${database}...!`);

function getUserById(id) {
    return postgresDb
        .query("SELECT * FROM users WHERE id = $1", [id])
        .then((result) => {
            return result.rows[0];
        });
}

function getUserByEmail(email) {
    return postgresDb
        .query("SELECT * FROM users WHERE email ILIKE $1", [email])
        .then((result) => {
            return result.rows[0];
        });
}
async function getLatestUserProfiles() {
    const result = await postgresDb.query(
        "SELECT id, first_name, last_name, bio, profile_url FROM users ORDER BY created_at DESC LIMIT 3 "
    );
    console.log("...(DB: getLatestUserProfiles) result: ", result);
    return result.rows;
}
function getUserProfiles(query) {
    return postgresDb
        .query(
            "SELECT id, first_name, last_name, bio, profile_url FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1",
            [query + "%"]
        )
        .then((result) => {
            console.log("...(DB: getUserProfiles) result: ", result);
            return result.rows;
        });
}

function saveUser({ first_name, last_name, email, password }) {
    console.log("...(saveUser)", first_name, last_name, email, password);
    return hashPassword(password).then((password_hash) => {
        return postgresDb.query(
            "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ( $1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, password_hash]
        );
    });
}

function saveSecretCode(email, secret_code) {
    // console.log("...(saveSecretCode)", email, secret_code);
    //delete codes older than 10min
    postgresDb.query(
        `DELETE FROM pwdreset WHERE CURRENT_TIMESTAMP - created_at > INTERVAL '10 minutes' RETURNING *`
    );
    return postgresDb.query(
        "INSERT INTO pwdreset(email, secret_code) VALUES ( $1, $2) RETURNING *",
        [email, secret_code]
    );
}

function getCodeByEmail({ email }) {
    console.log("...(getCodeByEmail)", email);
    return postgresDb
        .query(
            `SELECT * FROM pwdreset WHERE email ILIKE $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1 `,
            [email]
        )
        .then((result) => {
            return result.rows[0];
        });
}

function saveNewPassword({ email, password }) {
    // console.log("...(saveNewPassword)", email, password);
    return hashPassword(password).then((password_hash) => {
        return postgresDb.query(
            "UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *",
            [password_hash, email]
        );
    });
}

function saveProfileUrl({ profile_url, userId }) {
    // console.log("...(saveProfileUrl)", profile_url, userId);
    return postgresDb
        .query("UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *", [
            profile_url,
            userId,
        ])
        .then((result) => {
            console.log("...(saveProfileUrl) query result: ", result.rows);
            return result.rows[0];
        });
}

async function saveUserBio({ bio, userId }) {
    console.log("...(saveUserBio)", bio, userId);
    return postgresDb
        .query("UPDATE users SET bio = $1 WHERE id = $2 RETURNING *", [
            bio,
            userId,
        ])
        .then((result) => {
            console.log("...(saveUserBio) query result: ", result.rows);
            return result.rows[0];
        });
}

async function getFriendshipStatus({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
        [user1_id, user2_id]
    );
    console.log("...(DB: getFriendshipStatus) result: ", result.rows[0]);
    return result.rows[0];
}

async function saveFriendrequest({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "INSERT INTO friendships (sender_id, recipient_id) VALUES ($1,$2 ) RETURNING *",
        [user1_id, user2_id]
    );
    console.log("...(DB: saveFriendrequest) result: ", result.rows[0]);
    return result.rows[0];
}

async function deleteFriend({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING *",
        [user1_id, user2_id]
    );
    console.log("...(DB: deleteFriend) result: ", result.rows[0]);
    return result.rows[0];
}

async function updateFriendstatus({ user1_id, user2_id, friend_status }) {
    const result = await postgresDb.query(
        "UPDATE friendships SET friend_status = $3 WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING *",
        [user1_id, user2_id, friend_status]
    );
    console.log("...(DB: updateFriendstatus) result: ", result.rows[0]);
    return result.rows[0];
}
