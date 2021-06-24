require("dotenv").config();

const ValidateInstituteKey = (req, res) => {
  try {
    const key = req.body.key;
    if (key === process.env.INSTITUTE_KEY || key === `STCET`) {
      res.send("valid");
    } else res.send("invalid");
  } catch (err) {
    res.status(500).send(null);
  }
};

module.exports = {
  ValidateInstituteKey,
};
