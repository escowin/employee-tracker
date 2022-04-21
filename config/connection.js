const mysql = require("mysql2")

const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log("election database connected")
);

module.exports = db;