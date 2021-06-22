const db = require("../../Db_Connection/db");

const GetAll = (req, res) => {
  try {
    if (req.session.user) {
      const sql =
        "SELECT id,teacherName, subjectCode, subjectName,time FROM questions WHERE active=1;";
      db.query(sql, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.send(result);
        } else res.send("no question paper found");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetAll,
};
