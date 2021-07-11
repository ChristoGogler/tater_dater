const express = require("express");
const cookieSession = require("cookie-Session");
const app = express();
const csurf = require("csurf");
const compression = require("compression");
const { sessionSecret } = require("./secrets.json");
const path = require("path");
const { saveUser } = require("./db_queries");
const { loginUser } = require("./functions");

app.use(compression());

//express public folder
app.use(express.static(path.join(__dirname, "..", "client", "public")))
    .use(express.json())
    .use(
        cookieSession({
            secret: `${sessionSecret}`,
            maxAge: 1000 * 60 * 60 * 24 * 14,
        })
    );

//CSRF Token
app.use(csurf());
app.use(function (request, response, next) {
    response.cookie("myCsrfToken", request.csrfToken());
    next();
});

app.get("/user/id.json", (request, response) => {
    console.log("...(GET /user/id.json) request.session: ", request.session);

    response.json({
        userId: request.session.userId,
    });
});

app.post("/api/register", (request, response) => {
    console.log("...(POST /api/register) request.body: ", request.body);
    saveUser({ ...request.body })
        .then((user) => {
            request.session.userId = user.rows[0].id;
            response.statusCode = 200;
            response.json(user);
        })
        .catch((error) => {
            console.log("Error...blabla: ", error);
            response.statusCode = 400;
            response.json({ error: "Registration failed." });
        });
});
app.post("/api/login", (request, response) => {
    console.log("...(POST /api/login) request.body: ", request.body);
    loginUser({ ...request.body })
        .then((user) => {
            //TODO
            console.log("...(POST / api / login) user: ", user);
            request.session.userId = user.id;
            response.json(user);
        })
        .catch((error) => {
            console.log("Error POST /api/login: ", error);
            response.statusCode = 400;
            response.json({ error: "Login failed - wrong credentials!" });
        });
});
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
