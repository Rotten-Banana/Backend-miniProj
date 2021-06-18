const db = require("../../Db_Connection/db.js");
const argon2 = require("argon2");
const validate = require("../../validate.js");

const TeacherSignup = (req, res) => {
  if (!req.session.user) {
    try {
      const user = req.body;
      const flag =
        validate.validateTeacherTypeId(user.type_id) &&
        validate.validateTeacherType(user.type);
      if (flag) {
        let sql = "SELECT type_id FROM users WHERE type_id=?;";
        db.query(sql, user.type_id, async (err, result) => {
          if (err) res.status(400).send(err);
          if (result[0]) res.send("Teachers-Id already exist");
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
                if (err) {
                  if (err.errno === 1062) {
                    if (err.message.includes("Email")) {
                      res.send("This email is already");
                    }
                  } else res.send(err);
                } else {
                  res.send("inserted");
                }
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
  TeacherSignup,
};
