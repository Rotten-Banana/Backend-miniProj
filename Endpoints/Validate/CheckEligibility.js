const db = require("../../Db_Connection/db");

const CheckEligibility = (req, res) => {
  try {
    user = req.session.user;
    paperId = req.body.paperId;
    if (user) {
      const sql = "SELECT * FROM answer where questionId = ? and userId = ?;";
      db.query(sql, [paperId, user.id], (err, result) => {
        if (err) res.send(err);
        if (result[0]) {
          res.send("ineligible");
        } else res.send("eligible");
      });
    } else res.send("login first");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  CheckEligibility,
};
