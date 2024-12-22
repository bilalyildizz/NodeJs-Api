const AuditLogsModel = require('../db/models/AuditLogs');
const Enum = require('../config/Enum');
let instance = null;

class AuditLogs{
    constructor(){
        if(!instance) instance = this;
        return instance;
    }

    info(email, location, proc_type, log){
        this.#saveToDb({level: Enum.LOG_LEVELS.INFO, email, location, proc_type, log});
    }

    error(email, location, proc_type, log){
        this.#saveToDb({level: Enum.LOG_LEVELS.ERROR, email, location, proc_type, log});
    }

    warning(email, location, proc_type, log){
        this.#saveToDb({level: Enum.LOG_LEVELS.WARNING, email, location, proc_type, log});
    }

    #saveToDb({level, email, location, proc_type, log}){
        AuditLogsModel.create({level, email, location, proc_type, log});
    }
}

module.exports = new AuditLogs();
