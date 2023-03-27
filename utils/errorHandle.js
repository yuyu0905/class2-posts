const headers = require('./headers');

const errorHandle = (res, err = "欄位未填寫正確，或無此 id", code = 400) => {
    res.writeHead(code, headers);
    res.write(JSON.stringify({
        "status": 'false',
        "message" : err.errors ? err.errors : err
    }));
    res.end();
}

module.exports = errorHandle;