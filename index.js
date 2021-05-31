const express = require("express");
const session = require("express-session");
var cors = require("cors");

const db = require("./Db_Connection/db.js");
const { Login } = require("./Endpoints/Login.js");
const { Logout } = require("./Endpoints/logout.js");
const { StudentSignup } = require("./Endpoints/Signup/studentSignup.js");
const { TeacherSignup } = require("./Endpoints/Signup/teacherSignup.js");
const { me } = require("./Endpoints/me.js");
const {
  ValidateInstituteKey,
} = require("./Endpoints/Validate/validateInstituteKey.js");
const { CreatePaper } = require("./Endpoints/Teacher/createPaper.js");
const { GetAll } = require("./Endpoints/Questions/getall.js");
const { GetById } = require("./Endpoints/Questions/getById.js");

const app = express();
const port = 4000;
const MAX_AGE = 1000 * 60 * 60 * 5;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
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

app.get("/questions/getall", GetAll);

app.get("/me", me);

app.post("/question/getbyid", GetById);

app.post("/signup/student", StudentSignup);

app.post("/signup/teacher", TeacherSignup);

app.post("/validate/institutekey", ValidateInstituteKey);

app.post("/login", Login);

app.post("/logout", Logout);

app.post("/teacher/createpaper", CreatePaper);

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
