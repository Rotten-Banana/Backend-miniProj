const express = require("express");
const mysql = require('mysql2');
require('dotenv').config()

const app = express();
const port = 4000;


const db = mysql.createConnection({
    host : process.env.DB_HOST || 'localhost',
    port : 3306,
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASS,
    database : process.env.DB_NAME || 'examportal'
});


app.get('/', (req, res) =>{
    try {
        const sql = "SELECT * FROM examportal.users;"
        db.query(sql,(err,result)=>{
            if(err) res.send(err);
            res.send(result);
        })
    } catch {
        res.status(500).send(null);
    }
})

app.listen(port, ()=>{
    console.log(`server is running at: http://localhost:${port}`);
})