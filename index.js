const express = require("express");
const session = require("express-session");

const db = require("./Db_Connection/db.js");
const { Login } = require("./Endpoints/Login.js");
const { Logout } = require("./Endpoints/logout.js");
const { StudentSignup } = require("./Endpoints/Signup/studentSignup.js");
const { TeacherSignup } = require("./Endpoints/Signup/teacherSignup.js");

const app = express();
const port = 4000;
const MAX_AGE = 1000 * 60 * 60 * 5;

app.use(express.json());
app.use(
  session({
    secret: "Secret",
    resave: true,
    name: "Sid",
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  try {
    const sql = "SELECT * FROM examportal.users;";
    db.query(sql, (err, result) => {
      if (err) res.send(err);
      res.send(result);
    });
    console.log(req.session);
  } catch {
    res.status(500).send(null);
  }
});

app.post("/signup/student", StudentSignup);

app.post("/signup/teacher", TeacherSignup);

app.post("/login", Login);

app.post("/logout", Logout);

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
