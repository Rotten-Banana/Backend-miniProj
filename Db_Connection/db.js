const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "sql6.freemysqlhosting.net" || "localhost",
  port: 3306,
  user: "sql6419836" || "root",
  password: "fHmRjyj5g5",
  database: "sql6419836" || "examportal",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
