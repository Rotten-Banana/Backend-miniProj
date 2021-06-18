const db = require("../../Db_Connection/db");

const GetById = (req, res) => {
  try {
    const paperId = req.body.paperId;
    if (req.session.user) {
      const sql = "SELECT * FROM questions WHERE id=?;";
      db.query(sql, paperId, (err, result) => {
        if (err) res.send(err);
        if (result[0]) {
          res.send(result[0]);
        } else res.send("no question paper found of the given id");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  GetById,
};
