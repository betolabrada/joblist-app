require('dotenv').config();
const dbConfig = require('./config/Database.js');
const webServer = require('./services/WebServer.js');
const database = require('./services/Database.js');

process.env.UV_THREADPOOL_SIZE = dbConfig.pool.connectionLimit + 4;
let app = webServer.app;

async function startup(){
    console.log("Initializing database connection...");
    try{
        await database.initialize();
    }
    catch(err){
        console.log("Failed to connect", err);
        process.exit(-1);
    }

    console.log("Initializing web server....");
    try{
        await webServer.initialize();
    }
    catch(error){
        console.log(error);

        process.exit(-1);
    }
}

async function shutdown(e) {
    let err = e;

    console.log("Shutting down the db connection....");
    try {
        await database.close();
    }
    catch(e){
        err = err || e;
        console.log("Fail to close the db connection",e)
    }

    console.log("Shutting down the server......");
    try {
        await webServer.close();
    }
    catch(e){
        console.log("Fail to shutdown", e);
        err = err || e;
    }

    console.log("Exiting process");
    if(err){
        process.exit(-1);
    }
    else{
        process.exit(0);
    }
}

process.on('SIGTERM', ()=> {
    shutdown();
})

process.on('SIGINT', () => {
    shutdown();
})

process.on('uncaughtException', (err) => {
    console.log("Uncaught Exception", err);
    shutdown();
})

startup();

module.exports.startup = startup;
module.exports.shutdown = shutdown;
module.exports.app = app;