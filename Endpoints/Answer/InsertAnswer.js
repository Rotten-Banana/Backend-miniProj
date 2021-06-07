const db = require("../../Db_Connection/db");

const InsertAnswer = (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const data = req.body;
      const sql = `INSERT INTO answer ( questionId , subjectCode, subjectName, userId, userName, userTypeId, answer) VALUES (?,?,?,?,?,?,?);`;
      db.query(
        sql,
        [
          data.paperId,
          data.subCode,
          data.subName,
          user.id,
          user.name,
          user.typeId,
          data.answer,
        ],
        (err, result) => {
          if (err) res.send(err);
          else res.send("inserted");
        }
      );
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  InsertAnswer,
};
