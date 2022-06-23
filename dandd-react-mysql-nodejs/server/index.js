const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'password',
    database: 'dandddb',
});
app.post('/create',(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const apl = req.body.apl;
    const difficulty = req.body.difficulty;

    db.query("INSERT INTO partyinfo (name, apl, difficulty) VALUES(?,?,?)",
    [name,apl,difficulty], (err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("Values Inserted")
        }
    }
);
});

app.listen(3001, ()=>{
    console.log("Your server is running on port 3001");
})