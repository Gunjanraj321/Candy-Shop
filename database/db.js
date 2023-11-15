const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "products",
});

module.exports = connection;