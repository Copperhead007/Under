import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

app.use(express.json());



const db = mysql.createConnection({
    user : "root",
    host: "localhost",
    password: "password",
    database: "auth_db",
});
// database: 'dandddb',
    app.post("/register",(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO userinfo (username, password) VALUES (?,?)",
        [username,password],
        (err,result) =>{
        console.log(err);
    }
    );
    });
    
    app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM userinfo WHERE username = ? AND password = ?",
        [username,password],
        (err,result) =>{
        if(err){
            res.send({err: err});
        }
        if(result.length > 0)
        {
            res.send(result);
        }
        else
        {
            res.send({message : "Wrong username/password combination"});
        }
        }
        );
    });

    app.use(cors());

    /* For other party api..
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
*/

    app.listen(3001, ()=>{
        console.log("Your server is running on port 3001");
    })


