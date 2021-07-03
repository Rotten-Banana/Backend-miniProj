const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "remotemysql.com",
  port: 3306,
  user: "cCJHMBZ9GZ",
  password: "dYCRYg9Nkr",
  database: "cCJHMBZ9GZ",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
