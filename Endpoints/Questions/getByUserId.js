const db = require("../../Db_Connection/db");

const GetByUserId = (req, res) => {
  try {
    const teacherId = req.body.teacherId;
    if (req.session.user) {
      const sql = "SELECT * FROM examportal.questions WHERE teacherId=?;";
      db.query(sql, teacherId, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.send(result);
        } else res.send("no question paper found of the given id");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetByUserId,
};