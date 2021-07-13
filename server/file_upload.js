const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const bucketName = "profilepixbucket";
const url = `https://${bucketName}.s3.eu-central-1.amazonaws.com/`;

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),

    filename: function (request, file, callback) {
        uidSafe(24).then(function (uid) {
            console.log(url, uid, path.extname(file.originalname));

            request.body.profile_url =
                url + uid + path.extname(file.originalname);

            console.log("...(file_upload.js) URL: ", request.body.profile_url);
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
console.log("...(file_upload) storage", storage);
const uploader = multer({
    storage,
    limits: {
        filesize: 2097152,
    },
});
console.log("(file uploader): ", uploader);

const exporting = {
    uploader,
};

module.exports = exporting;
