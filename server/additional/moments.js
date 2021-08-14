const exporting = {
    changeDateToTimepast,
};

module.exports = exporting;

const moment = require("moment");

function changeDateToTimepast(result) {
    result.rows.forEach((comment) => {
        comment.created_at = moment(comment.created_at).fromNow();
    });
}
