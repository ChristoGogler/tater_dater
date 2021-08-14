const express = require("express");
const potatoRouter = express.Router();

const {
    getAllPotatoes,
    getPotatoById,
    updatePotatoes,
} = require("../middlewares/potatoRoutesHandler");

//GET POTATOES
potatoRouter.get(`/allpotatoes_by_id/:id`, getAllPotatoes);
potatoRouter.post(`/addpotato`, updatePotatoes);
potatoRouter.get(`/potato_by_id/:id`, getPotatoById);

module.exports = potatoRouter;
