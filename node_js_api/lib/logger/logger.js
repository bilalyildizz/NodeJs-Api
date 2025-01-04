const winston = require('winston');
const { LOG_LEVEL } = require('../../config');

const formats = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    winston.format.simple(),
    winston.format.splat(),
    winston.format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: [email: ${info.message.email}] [location: ${info.message.location}] [procType: ${info.message.procType}] [log: ${info.message.log}]`)
)

//2023-01-04 10:00:00.000 INFO: [email: test@test.com] [location: test] [procType: test] [log: test]


const logger = winston.createLogger({
    level: LOG_LEVEL,
    transports: [
        new winston.transports.Console({
            format: formats
        })
    ]
});

module.exports = logger;
