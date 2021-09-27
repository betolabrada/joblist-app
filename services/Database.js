const mysql = require('mysql2/promise');
const dbConfig = require('../config/Database.js');

let pool;
function initialize(){
    pool = mysql.createPool(dbConfig.pool);
}

async function close(){
    await pool.end();
}

function queryExecutor(sql, values) {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.query(sql, values);
            resolve(rows);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.queryExecutor = queryExecutor;