const {
    getPotatoesById,
    getSinglePotatoById,
    savePotatoes,
} = require("../database/db_queries");

const getAllPotatoes = async (request, response) => {
    console.log("...(RH getAllPotatoes) id: ", request.params.id);
    const id = request.params.id;
    try {
        const potatoCount = await getPotatoesById({ id });
        console.log("...(RH getAllPotatoes) potatoCount: ", potatoCount);
        response.json(potatoCount);
    } catch (error) {
        response.json({ error: "Problem fetching potatoes: " + error });
    }
};
const getPotatoById = async (request, response) => {
    console.log("...(RH getPotatoById) id: ", request.params.id);
    const receiver = request.params.id;
    const sender = request.session.userId;
    try {
        const hasGivenPotato = await getSinglePotatoById({ sender, receiver });
        console.log("...(RH getPotatoById) hasGivenPotato: ", hasGivenPotato);
        response.json({ hasGivenPotato });
    } catch (error) {
        response.json({ error: "Problem fetching potato: " + error });
    }
};
const updatePotatoes = async (request, response) => {
    const { userId: user1_id } = request.session;
    const { action: isAdding, user2_id } = request.query;
    try {
        const potatoCount = await savePotatoes({
            user1_id,
            user2_id,
            isAdding,
        });
        response.json(potatoCount);
    } catch (error) {
        console.log("ERROR changing potatocount: ", error);
        response.json({ error: "Problem changing potatocount: " + error });
    }
};

module.exports = { getAllPotatoes, getPotatoById, updatePotatoes };
