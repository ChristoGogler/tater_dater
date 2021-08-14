const exporting = {
    deleteFriend,
    getFriendshipStatus,
    getFriendsAndPending,
    getFriendsById,
    getPhotosById,
    getUserByEmail,
    getUserById,
    getLatestChatmessages,
    getLatestUserProfiles,
    getUserProfiles,
    getUserProfileDetailsById,
    saveFriendrequest,
    saveUser,
    saveNewPassword,
    saveSecretCode,
    getCodeByEmail,
    saveChatmessage,
    saveProfileUrl,
    saveUserBio,
    updateFriendstatus,
    updatePhotoById,
    updateUser,
    updateUserProfile,
    getPotatoesById,
    getSinglePotatoById,
    savePotatoes,
};
module.exports = exporting;

const spicedpg = require("spiced-pg");
const { hashPassword, changeDateToTimepast } = require("../additional/moments");

const user = process.env.user || require("../secrets.json").user;
const pwd = process.env.pwd || require("../secrets.json").pwd;
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

async function getPhotosById(id) {
    const photos = await postgresDb.query(
        "SELECT * FROM photos WHERE user_id = $1 ORDER BY id DESC",
        [id]
    );
    // console.log("...(DB getPhotosById) photos:", photos);
    return photos.rows;
}

async function saveUser({ first_name, last_name, email, password }) {
    const password_hash = await hashPassword(password);
    return postgresDb.query(
        "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ( $1, $2, LOWER($3), $4) RETURNING *",
        [first_name, last_name, email, password_hash]
    );
}

async function updateUser({ id, first_name, last_name, email, password }) {
    console.log(
        "...(DB updateUser) id, first_name, last_name, email, password: ",
        id,
        first_name,
        last_name,
        email,
        password
    );
    if (password) {
        const password_hash = await hashPassword(password);
        return postgresDb.query(
            "UPDATE users SET email = $1, first_name = $2, last_name = $3, password_hash = $4 WHERE id = $5 RETURNING *",
            [email, first_name, last_name, password_hash, id]
        );
    } else {
        return postgresDb.query(
            "UPDATE users SET email = $1, first_name = $2, last_name = $3 WHERE id = $4 RETURNING *",
            [email, first_name, last_name, id]
        );
    }
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
    return result.rows[0].secret_code;
}

async function saveNewPassword({ email, password }) {
    const password_hash = await hashPassword(password);
    return postgresDb.query(
        "UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *",
        [password_hash, email]
    );
}

async function saveProfileUrl({ userId, profile_url }) {
    const newProfilePhoto = await postgresDb.query(
        "UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *",
        [profile_url, userId]
    );
    await postgresDb.query(
        "INSERT INTO photos (user_id, photo_url) VALUES ($1,$2)  RETURNING *",
        [userId, profile_url]
    );
    return newProfilePhoto.rows[0];
}

async function updatePhotoById({ userId, photo_url }) {
    const newProfilePhoto = await postgresDb.query(
        "UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *",
        [photo_url, userId]
    );
    return newProfilePhoto.rows[0];
}

async function saveUserBio({ bio, userId }) {
    return postgresDb
        .query("UPDATE users SET bio = $1 WHERE id = $2 RETURNING *", [
            bio,
            userId,
        ])
        .then((user) => {
            return user.rows[0];
        });
}

async function getFriendshipStatus({ user1_id, user2_id }) {
    const friendship = await postgresDb.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
        [user1_id, user2_id]
    );
    return friendship.rows[0];
}

async function saveFriendrequest({ user1_id, user2_id }) {
    const friendship = await postgresDb.query(
        "INSERT INTO friendships (sender_id, recipient_id) VALUES ($1,$2 ) RETURNING *",
        [user1_id, user2_id]
    );
    const user = await getUserById(user2_id);
    const friend = {
        id: friendship.rows[0].id,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_url: user.profile_url,
        friend_status: friendship.rows[0].friend_status,
        sender_id: friendship.rows[0].sender_id,
        recipient_id: friendship.rows[0].recipient_id,
    };
    return friend;
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
    const result = await postgresDb.query(
        `SELECT users.id, users.first_name, users.last_name, users.profile_url, friendships.friend_status, friendships.sender_id
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

async function getFriendsById({ id }) {
    const result = await postgresDb.query(
        `SELECT users.id, users.first_name, users.last_name, users.profile_url, friendships.friend_status, friendships.sender_id
  FROM friendships
  JOIN users
  ON (friend_status = 'friends' AND recipient_id = $1 AND sender_id = users.id)
  OR (friend_status = 'friends' AND sender_id = $1 AND recipient_id = users.id)
  ORDER BY first_name ASC`,
        [id]
    );
    return result.rows;
}
async function saveChatmessage({ userId, chatmessage }) {
    const result = await postgresDb.query(
        "INSERT INTO chatmessages (sender_id, chatmessage) VALUES ($1, $2) RETURNING *",
        [userId, chatmessage]
    );
    changeDateToTimepast(result);
    return result.rows[0];
}

async function getLatestChatmessages({ limit }) {
    const result = await postgresDb.query(
        `SELECT chatmessages.id, sender_id, chatmessage, chatmessages.created_at, first_name, last_name, profile_url FROM chatmessages 
        JOIN users
        ON sender_id = users.id
        ORDER BY chatmessages.id DESC LIMIT $1`,
        [limit]
    );
    changeDateToTimepast(result);
    return result.rows.reverse();
}

async function getPotatoesById({ id }) {
    console.log("...(DB getPotatoesById) id: ", id);
    let potato_count;
    try {
        potato_count = await postgresDb.query(
            "SELECT COUNT(*) from potatoes where receiver_id = $1",
            [id]
        );
        console.log(
            "...(DB TRY getPotatoesById) potato_count: ",
            potato_count.rows[0].count
        );
        return potato_count.rows[0].count;
    } catch (error) {
        // console.log(
        //     "...(DB CATCH getPotatoesById) potato_count: ",
        //     potato_count.data.potatoCount.rows[0].count,
        //     error
        // );

        return -1;
    }
}
async function getSinglePotatoById({ sender, receiver }) {
    console.log("...(DB getSinglePoatoById) ");

    const potatoButtonState = await postgresDb.query(
        "SELECT COUNT(*) FROM potatoes WHERE sender_id = $1 AND receiver_id = $2",
        [sender, receiver]
    );
    console.log("...(DB) potatoButtonState: ", potatoButtonState.rows[0].count);
    if (potatoButtonState.rows[0].count > 0) {
        return false;
    }
    return true;
}
async function savePotatoes({ user1_id, user2_id, isAdding }) {
    console.log(
        "...(DB savePotatoes) user1_id, user2_id, isAdding: ",
        user1_id,
        user2_id,
        isAdding
    );

    let potatoButtonState;
    if (isAdding == 0) {
        potatoButtonState = await postgresDb.query(
            "DELETE FROM potatoes where sender_id = $1 AND receiver_id = $2",
            [user1_id, user2_id]
        );
        console.log("...(DB savePotatoes) DELETE :", potatoButtonState);
    } else {
        potatoButtonState = await postgresDb.query(
            "INSERT INTO potatoes (sender_id, receiver_id, potato_count) VALUES ($1,$2, $3) returning *",
            [user1_id, user2_id, isAdding]
        );
        console.log("...(DB savePotatoes) INSERT :", potatoButtonState);
    }

    return potatoButtonState;
}

async function getUserProfileDetailsById(id) {
    console.log("...(DB getUserProfileDetailsById) id: ", id);

    const userProfileDetails = await postgresDb.query(
        "SELECT * FROM profiles WHERE user_id = $1",
        [id]
    );
    console.log("...(DB) userProfileDetails: ", userProfileDetails.rows[0]);

    return userProfileDetails.rows[0];
}

async function updateUserProfile({
    userId,
    about_me,
    city,
    likes,
    dislikes,
    interested_in,
    gender,
    orientation,
}) {
    console.log(
        "...(DB updateUserProfile)",
        userId,
        about_me,
        city,
        likes,
        dislikes,
        interested_in,
        gender,
        orientation
    );

    return postgresDb.query(
        "UPDATE profiles SET about_me = $2, city = $3, likes = $4, dislikes = $5, interested_in = $6, gender = $7, orientation = $8 WHERE user_id = $1 RETURNING *",
        [
            userId,
            about_me,
            city,
            likes,
            dislikes,
            interested_in,
            gender,
            orientation,
        ]
    );
}
