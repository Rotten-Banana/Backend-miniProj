const db = require("../Db_Connection/db.js");
const argon2 = require("argon2");

const Login = (req, res) => {
  if (!req.session.user) {
    try {
      const user = req.body;
      let sql = `SELECT * FROM examportal.users WHERE type_id=?;`;
      db.query(sql, user.type_id, async (err, result) => {
        if (err) res.status(400).send(err);
        if (result[0]) {
          if (await argon2.verify(result[0].password, user.password)) {
            req.session.user = {
              type: result[0].type,
              id: result[0].UserId,
            };
            res.status(200).send("logged in");
          } else res.send("wrong password");
        } else res.send("invalid id / user doesnot exist sign up first");
      });
    } catch {
      res.status(500).send(null);
    }
  } else res.send("already logged in");
};

module.exports = {
  Login,
};
