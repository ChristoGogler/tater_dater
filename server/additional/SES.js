const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.accessKeyID,
    secretAccessKey: secrets.secretAccessKey,
    region: "eu-central-1",
});

exports.sendEmail = (to, body, subject) => {
    console.log("...(sendEmail) ", to, body, subject);
    return ses
        .sendEmail({
            Source: "Christo Sender <christo@yoga-craft.com>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise();
};
