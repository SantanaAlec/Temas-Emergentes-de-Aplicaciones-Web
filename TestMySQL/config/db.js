//Module to instance Database conection
const mysql = require("mysql2");
require("dotenv").config({ path: "./variables.env" });
const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = conection;
