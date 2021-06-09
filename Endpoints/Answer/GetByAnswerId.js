const db = require("../../Db_Connection/db");

const GetByAnswerId = (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const answerId = req.body.answerId;
      const sql = "SELECT * FROM examportal.answer WHERE id=?;";
      db.query(sql, answerId, (err, result) => {
        if (err) res.send(err);
        if (result[0]) {
          res.send(result[0]);
        } else res.send("No Answer found");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetByAnswerId,
};
