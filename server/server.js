const express = require("express");
const cookieSession = require("cookie-Session");
const app = express();
const compression = require("compression");
const { sessionSecret } = require("./secrets.json");
const path = require("path");
const { saveUser } = require("./db_queries");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")))
    .use(express.json())
    .use(
        cookieSession({
            secret: `${sessionSecret}`,
            maxAge: 1000 * 60 * 60 * 24 * 14,
        })
    );

app.get("/user/id.json", function (request, response) {
    console.log("...(GET /user/id.json) request.session: ", request.session);

    response.json({
        userId: request.session.userId,
    });
});

app.post("/api/register", function (request, response) {
    console.log("...(POST /api/register) request.body: ", request.body);
    saveUser({ ...request.body }).then((user) => {
        console.log("(.then) user.rows ID: ", user.rows[0].id);
        request.session.userId = user.rows[0].id;
        console.log("(.then) request.session.userId: ", request.session.userId);
        response.json(user);
    });
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
