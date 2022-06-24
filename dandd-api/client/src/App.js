import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {
  const[name, setName] = useState("");
  const[apl, setAPL] = useState(0);
  const[diff, setDiff] = useState("");

  const[usernameReg, setUsernameReg] = useState("");
  const[passwordReg, setPasswordReg] = useState("");

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  //https://copperhead007.github.io/Under/dandd-api/public
  //
  const register = () => {
    Axios.post("http://localhost:3001/register", 
    {
      username : usernameReg,
      password : passwordReg
    }).then((response) => {
      console.log(response);
    });
  };
  const login = () => {
    Axios.post("http://localhost:3001/login", 
    {username : username,
     password : password
    }).then((response) => {
      console.log(response);
    });
  };

    const displayInfo = () => {
        console.log( name + " " + apl + " " + diff);
    };
    const addParty = () => {
      console.log(name);
        Axios.post('http://localhost:3001/create',{name: name,
         apl : apl, difficulty : diff}).then(() => {
          console.log("success");
         })
    };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" onChange={(e) => {
          setUsernameReg(e.target.value);}}/>
      <label>Password</label>
      <input type="text" onChange={(e) => {
          setPasswordReg(e.target.value);}}/>
      <button onClick={register}>Register</button>
      </div>


      <div className="login">
        <input type="text" placeholder="Username" onChange={(e) => {
          setUsername(e.target.value);}}/>
        <input type="text" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);}}/>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default App;
/* Originally in Return for Landing page
figure out how to go from state to state
<div className="information">
      <label>Party Name</label>
      <input type="text" onChange={(event)=> {setName(event.target.value)}}/>
      <label>APL</label>
      <input type="number" onChange={(event)=> {setAPL(event.target.value)}}/>
      <label>Difficulty</label>
      <input type="text" onChange={(event)=> {setDiff(event.target.value)}}/>
      <button onClick={addParty}>Add Player</button>
     </div>
     */