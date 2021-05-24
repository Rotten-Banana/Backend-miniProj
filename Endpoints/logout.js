const Logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) return res.send("session cannot be destroyed");
      res.clearCookie("Sid");
      res.send("session destroyed successfuly");
    });
  } else res.send("not logged in");
};

module.exports = {
  Logout,
};
