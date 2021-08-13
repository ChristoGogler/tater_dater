const express = require("express");
const potatoRouter = express.Router();

const {
    changeFriendStatus,
    csrfToken,
    getAllPotatoes,
    getPotatoById,
    getFriendStatus,
    getFriendList,
    getFriendListById,
    getAllPhotosById,
    saveProfilePictureUrl,
    updateProfilePic,
    updatePotatoes,
} = require("../routehandler");

//GET POTATOES
potatoRouter.get(`/allpotatoes_by_id/:id`, getAllPotatoes);
potatoRouter.post(`/addpotato`, updatePotatoes);
potatoRouter.get(`/potato_by_id/:id`, getPotatoById);

module.exports = potatoRouter;
