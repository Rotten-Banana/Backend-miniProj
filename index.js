const argon2 = require("argon2");
const express = require("express");
const mysql = require("mysql2");
const validate = require("./validate.js");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || "examportal",
});

app.get("/", (req, res) => {
  try {
    const sql = "SELECT * FROM examportal.users;";
    db.query(sql, (err, result) => {
      if (err) res.send(err);
      res.send(result);
    });
  } catch {
    res.status(500).send(null);
  }
});

app.post("/signup/student", (req, res) => {
  try {
    const user = req.body;
    const flag =
      validate.validateStudentTypeId(user.type_id) &&
      validate.validateStudentType(user.type);
    if (flag) {
      let sql = "SELECT type_id FROM examportal.users WHERE type_id=?;";
      db.query(sql, user.type_id, async (err, result) => {
        if (err) res.status(400).send(err);
        if (result[0]) res.status(400).send("College-Id already exist");
        else {
          user.password = await argon2.hash(user.password);
          let sql_insert = `INSERT INTO users ( type , full_name, email, password, type_id )
          VALUES (?,?,?,?,?)`;
          db.query(
            sql_insert,
            [
              user.type,
              user.full_name,
              user.email,
              user.password,
              user.type_id,
            ],
            (err, result) => {
              if (err) res.status(400).send(err);
              else res.send("inserted");
            }
          );
        }
      });
    } else res.status(400).send("invalid form");
  } catch {
    res.status(500).send(null);
  }
});

app.post("/signup/teacher", (req, res) => {
  try {
    const user = req.body;
    const flag =
      validate.validateTeacherTypeId(user.type_id) &&
      validate.validateTeacherType(user.type);
    if (flag) {
      let sql = "SELECT type_id FROM examportal.users WHERE type_id=?;";
      db.query(sql, user.type_id, async (err, result) => {
        if (err) res.status(400).send(err);
        if (result[0]) res.status(400).send("Teachers-Id already exist");
        else {
          user.password = await argon2.hash(user.password);
          let sql_insert = `INSERT INTO users ( type , full_name, email, password, type_id )
          VALUES (?,?,?,?,?)`;
          db.query(
            sql_insert,
            [
              user.type,
              user.full_name,
              user.email,
              user.password,
              user.type_id,
            ],
            (err, result) => {
              if (err) res.status(400).send(err);
              else res.send("inserted");
            }
          );
        }
      });
    } else res.status(400).send("invalid form");
  } catch {
    res.status(500).send(null);
  }
});

app.post("/login", (req, res) => {
  try {
    const user = req.body;
    let sql = `SELECT * FROM examportal.users WHERE type_id=?;`;
    db.query(sql, user.type_id, async (err, result) => {
      if (err) res.status(400).send(err);
      if (result[0]) {
        if (await argon2.verify(result[0].password, user.password)) {
          res.status(200).send("loged in");
        } else res.send("wrong password");
      } else res.send("invalid id / user doesnot exist sign up first");
    });
  } catch {
    res.status(500).send(null);
  }
});

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
