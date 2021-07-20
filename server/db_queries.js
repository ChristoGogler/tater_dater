const exporting = {
    deleteFriend,
    getFriendshipStatus,
    getFriendsAndPending,
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

async function getUserById(id) {
    const result = await postgresDb.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
}

async function getUserByEmail(email) {
    const result = await postgresDb.query(
        "SELECT * FROM users WHERE email ILIKE $1",
        [email]
    );
    return result.rows[0];
}

async function getLatestUserProfiles() {
    const result = await postgresDb.query(
        "SELECT id, first_name, last_name, bio, profile_url FROM users ORDER BY created_at DESC LIMIT 3 "
    );
    return result.rows;
}

async function getUserProfiles(query) {
    const result = await postgresDb.query(
        "SELECT id, first_name, last_name, bio, profile_url FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1",
        [query + "%"]
    );
    return result.rows;
}

async function saveUser({ first_name, last_name, email, password }) {
    const password_hash = await hashPassword(password);
    return postgresDb.query(
        "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ( $1, $2, LOWER($3), $4) RETURNING *",
        [first_name, last_name, email, password_hash]
    );
}

async function saveSecretCode(email, secret_code) {
    //delete codes older than 10min
    await postgresDb.query(
        `DELETE FROM pwdreset WHERE CURRENT_TIMESTAMP - created_at > INTERVAL '10 minutes' RETURNING *`
    );
    return postgresDb.query(
        "INSERT INTO pwdreset(email, secret_code) VALUES ( $1, $2) RETURNING *",
        [email, secret_code]
    );
}

async function getCodeByEmail({ email }) {
    const result = await postgresDb.query(
        `SELECT * FROM pwdreset WHERE email ILIKE $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1 `,
        [email]
    );
    return result.rows[0];
}

async function saveNewPassword({ email, password }) {
    const password_hash = await hashPassword(password);
    return postgresDb.query(
        "UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *",
        [password_hash, email]
    );
}

async function saveProfileUrl({ profile_url, userId }) {
    const result = await postgresDb.query(
        "UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *",
        [profile_url, userId]
    );
    return result.rows[0];
}

async function saveUserBio({ bio, userId }) {
    return postgresDb
        .query("UPDATE users SET bio = $1 WHERE id = $2 RETURNING *", [
            bio,
            userId,
        ])
        .then((result) => {
            return result.rows[0];
        });
}

async function getFriendshipStatus({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
        [user1_id, user2_id]
    );
    return result.rows[0];
}

async function saveFriendrequest({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "INSERT INTO friendships (sender_id, recipient_id) VALUES ($1,$2 ) RETURNING *",
        [user1_id, user2_id]
    );
    return result.rows[0];
}

async function deleteFriend({ user1_id, user2_id }) {
    const result = await postgresDb.query(
        "DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING sender_id, recipient_id",
        [user1_id, user2_id]
    );
    return result.rows[0];
}

async function updateFriendstatus({ user1_id, user2_id, friend_status }) {
    const result = await postgresDb.query(
        "UPDATE friendships SET friend_status = $3 WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING *",
        [user1_id, user2_id, friend_status]
    );
    return result.rows[0];
}

async function getFriendsAndPending({ userId }) {
    console.log("...(DB getFriendsAndPending) user1_id: ", userId);
    const result = await postgresDb.query(
        `SELECT users.id, users.first_name, users.last_name, users.profile_url, friendships.friend_status
  FROM friendships
  JOIN users
  ON (friend_status = 'pending' AND recipient_id = $1 AND sender_id = users.id)
  OR (friend_status = 'pending' AND sender_id = $1 AND recipient_id = users.id)
  OR (friend_status = 'friends' AND recipient_id = $1 AND sender_id = users.id)
  OR (friend_status = 'friends' AND sender_id = $1 AND recipient_id = users.id)
  ORDER BY first_name ASC`,
        [userId]
    );
    return result.rows;
}
