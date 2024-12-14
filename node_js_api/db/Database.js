const mongoose = require('mongoose');

let instance = null;

class Database{
    constructor(){
        if(!instance){
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }

    async connect(options){
        try{
            console.log("DB connecting to: ", options.connectionString);
            let db = await mongoose.connect(options.connectionString);
            this.mongoConnection = db;
            console.log("DB connected");
        }catch(error){
            console.log("DB connection error: ", error);
            process.exit(1);
        }
    }
}

module.exports = Database;
