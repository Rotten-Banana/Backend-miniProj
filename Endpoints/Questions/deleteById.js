const db = require("../../Db_Connection/db");

const DeleteById = (req, res) => {
  try {
    const paperId = req.body.paperId;
    if (req.session.user) {
      const sql =
        "UPDATE questions SET active=false where id=? and teacherId=?;";
      db.query(sql, [paperId, req.session.user.id], (err, result) => {
        if (err) res.send(err);
        else res.send("deleted");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  DeleteById,
};
