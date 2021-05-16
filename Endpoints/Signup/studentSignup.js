const db = require("../../Db_Connection/db.js");
const argon2 = require("argon2");
const validate = require("../../validate.js");

const StudentSignup = (req, res) => {
  if (!req.session.user) {
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
  } else res.send("already logged in");
};

module.exports = {
  StudentSignup,
};
