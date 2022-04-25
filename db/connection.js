const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log("election database connected")
);

connection.connect(function (err){
    if (err) throw err;
})

module.exports = connection;