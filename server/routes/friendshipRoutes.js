const express = require("express");
const friendshipRouter = express.Router();

const {
    changeFriendStatus,
    getFriendStatus,
    getFriendList,
    getFriendListById,
} = require("../middlewares/routehandler");

//GET FRIENDSHIP STATUS
friendshipRouter.get("/status/:user_id", getFriendStatus);

//CHANGE FRIEND STATUS
friendshipRouter.post("/request", changeFriendStatus);

//GET FRIENDS AND PENDING
friendshipRouter.get("/friends", getFriendList);

//GET OTHER USERS FRIENDS
friendshipRouter.get("/friends_by_id/:id", getFriendListById);

module.exports = friendshipRouter;
