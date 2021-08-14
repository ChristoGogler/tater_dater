const csrfToken = (request, response, next) => {
    response.cookie("myCsrfToken", request.csrfToken());
    next();
};

module.exports = csrfToken;
