const db = require("../../Db_Connection/db");

const GetByStudentId = (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const studentId = req.body.studentId;
      const sql =
        "SELECT id, subjectCode, subjectName, userName, userTypeId, marks FROM answer WHERE userId=?;";
      db.query(sql, studentId, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.send(result);
        } else res.send("Not Marked yet.");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetByStudentId,
};
