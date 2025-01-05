/* eslint-disable no-undef */
module.exports = {
    "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://localhost:27017/node_js_api",
    "PORT": process.env.PORT || "3000",
    "JWT": {
        "SECRET": "secret",
        "EXPIRE_TIME" : !isNaN(parseInt(process.env.JWT_EXPIRE_TIME)) ? parseInt(process.env.JWT_EXPIRE_TIME) : 3600
    }
}