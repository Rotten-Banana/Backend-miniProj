const me = (req, res) => {
  if (!req.session.user) {
    res.send("not logged in");
  } else {
    res.send(req.session.user);
  }
};

module.exports = {
  me,
};
