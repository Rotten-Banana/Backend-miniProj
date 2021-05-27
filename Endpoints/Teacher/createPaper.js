const db = require("../../Db_Connection/db");

const CreatePaper = (req, res) => {
  try {
    if (req.session.user) {
      const user = req.session.user;
      if (user.type === "T") {
        const data = req.body;
        let sql = `INSERT INTO questions ( teacherName , subjectCode, subjectName, time, questions, teacherId )
          VALUES (?,?,?,?,?,?)`;
        db.query(
          sql,
          [
            user.name,
            data.subjectCode,
            data.subjectName,
            data.time,
            data.questions,
            user.id,
          ],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send("question paper added");
            }
          }
        );
      } else {
        res.send("you are not a teacher");
      }
    } else {
      res.send("login first");
    }
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  CreatePaper,
};
