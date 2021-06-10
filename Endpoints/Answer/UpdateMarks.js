const db = require("../../Db_Connection/db");

const UpdateMarks = (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const data = req.body;
      const sql = `UPDATE answer SET marks = ? WHERE id = ?`;
      db.query(sql, [data.marks, data.id], (err, result) => {
        if (err) res.send(err);
        else res.send("marks updated");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  UpdateMarks,
};
