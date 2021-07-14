const express = require("express");
const cookieSession = require("cookie-Session");
const app = express();
const csurf = require("csurf");
const compression = require("compression");
const { sessionSecret } = require("./secrets.json");
const path = require("path");
const {
    saveUser,
    getCodeByEmail,
    getUserById,
    saveNewPassword,
    saveProfileUrl,
    saveUserBio,
} = require("./db_queries");
const { uploader } = require("./file_upload");
const { uploadFiles3 } = require("./s3");
const { loginUser, verifyEmail, sendRegistrationMail } = require("./functions");

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
//GET USER
app.get("/api/user", (request, response) => {
    const { userId } = request.session;
    getUserById(userId).then((user) => {
        console.log("...(GET /api/user) USER: ", user);
        response.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_url: user.profile_url,
            bio: user.bio,
        });
    });
});

//CHECK IF LOGGED IN
app.get("/user/id.json", (request, response) => {
    console.log("...(GET /user/id.json) request.session: ", request.session);
    response.json({
        userId: request.session.userId,
    });
});
//REGISTER
app.post("/api/register", (request, response) => {
    console.log("...(POST /api/register) request.body: ", request.body);
    saveUser({ ...request.body })
        .then((user) => {
            request.session.userId = user.rows[0].id;
            response.statusCode = 200;
            sendRegistrationMail(user.rows[0]);
            response.json(user);
        })
        .catch((error) => {
            console.log("Error...blabla: ", error);
            response.statusCode = 400;
            response.json({
                error: "There already exists an account with this email.",
            });
        });
});
//LOGIN
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
//LOGOUT
app.post("/logout", (request, response) => {
    console.log("...(POST /api/logout) request: ", request.body);
    request.session.userId = null;
    console.log("...(POST /api/logout) userId after: ", request.session.userId);
    response.json({ message: "You've been logged out successfully!" });
});
//PASSWORD  RESET
app.post("/password/reset/step1", (request, response) => {
    console.log("...(POST /password/reset/step1)");
    verifyEmail({ ...request.body }).then((isVerified) => {
        if (isVerified) {
            response.json({ isVerified: true });
            return;
        }
        response.statusCode = 400;
        response.json({ error: "Verification failed - email not registered!" });
    });
});
app.post("/password/reset/step2", (request, response) => {
    console.log("...(POST /password/reset/step2)");
    getCodeByEmail({ ...request.body }).then((result) => {
        console.log(
            "Code, request.body",
            result.secret_code,
            request.body.code
        );
        if (result.secret_code == request.body.code) {
            saveNewPassword({ ...request.body }).then((user) => {
                response.json({ user: user });
            });
        }
    });
});
//UPLOAD PROFILE PICTURE
app.post(
    "/api/upload",
    uploader.single("file"),
    uploadFiles3,
    (request, response) => {
        console.log("...(POST /api/upload) request.file: )", request.file);
        // console.log("...(POST /api/upload)) response: ", response);
        saveProfileUrl({ ...request.body, ...request.session }).then(
            (result) => {
                console.log(
                    "...(POST api/upload saveProfileUrl) result: ",
                    result
                );
                response.json({ user: result });
                return;
            }
        );
    }
);
// SAVE NEW BIO
app.put("/api/user/update/bio", (request, response) => {
    console.log("...(PUT /api/user/update/bio)", request.body);
    const { userId } = request.session;
    const { bio } = request.body;
    saveUserBio({ bio, userId })
        .then((result) => {
            console.log("...(PUT /api/user/update/bio) result: ", result);
            response.json(result);
        })
        .catch((error) => {
            console.log("Error saving user bio: ", error);
        });
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
