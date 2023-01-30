const dotenv = require('dotenv');
dotenv.config();
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "employee_tracker_db"
    }
);

module.exports = db;