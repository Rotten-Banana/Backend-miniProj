const db = require("../../Db_Connection/db");

const GetByQuestionId = (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const questionId = req.body.questionId;
      const sql =
        "SELECT id, subjectCode, subjectName, userName, userTypeId, marks FROM answer WHERE questionId=?;";
      db.query(sql, questionId, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.send(result);
        } else res.send("No Answer is Submitted yet.");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetByQuestionId,
};
