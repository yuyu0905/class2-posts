const errorHandle = require('../utils/errorHandle');
const successHandle = require('../utils/successHandle');

const http = {
    cors (req, res) {
        successHandle(res);
    },
    notFound (req, res) {
        errorHandle(res, "無此網站路由", 404);
    }
}

module.exports = http;