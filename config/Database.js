module.exports = { 
    pool: {
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        host: process.env.MYSQL_CONN,
        database: process.env.MYSQL_DBNAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0 
    }
}