const logger = require('./logger');
let instance = null;


class LoggerClass{
    constructor(){
        if(instance){
            return instance;
        }
        instance = this;
    }

    #createLogObject(email, location, procType, log){
        return {
            email,
            location,
            procType,
            log
        }
    }

    info(email, location, procType, log){
        let logObject = this.#createLogObject(email, location, procType, log);
        logger.info(logObject);
    }

    warning(email, location, procType, log){
        let logObject = this.#createLogObject(email, location, procType, log);
        logger.warning(logObject);
    }

    error(email, location, procType, log){
        let logObject = this.#createLogObject(email, location, procType, log);
        logger.error(logObject);
    }
}

module.exports = new LoggerClass();

