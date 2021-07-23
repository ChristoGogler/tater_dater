const { request } = require("express");
const {
    saveUser,
    getUserById,
    getFriendshipStatus,
} = require("./server/db_queries");

const user = {
    first_name: "Peter",
    last_name: "Pasta",
    email: "peter@pasta.com",
    password: "peterpasta",
};

// saveUser(user).then((result) => console.log(result));
request.session.user_id = 1;
request.params.user_id = 2;

getFriendshipStatus().then((result) => console.log(result));
