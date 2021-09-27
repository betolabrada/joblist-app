const http = require('http');
const express = require('express');
const router = require('./Router');
const config = require('../config/WebServer.js');
const morgan = require('morgan');

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(morgan('combined'));
        app.use(express.json());
        httpServer = http.createServer(app);

        app.use('/api', router);

        app.get("/", (req,res) => {
            res.end("Hello World");
        })

        httpServer.listen(config.port)
            .on('listening', () => {
                console.log(`Web server on, listening on port: ${config.port}`);
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
    })
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if(err){
                reject(err);
                return;
            }

            resolve();
        })
    })
}

module.exports.initialize = initialize;
module.exports.close = close;