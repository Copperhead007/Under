import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {
  const[name, setName] = useState("");
  const[apl, setAPL] = useState(0);
  const[diff, setDiff] = useState("");

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
      <div className="information">
      <label>Party Name</label>
      <input type="text" onChange={(event)=> {setName(event.target.value)}}/>
      <label>APL</label>
      <input type="number" onChange={(event)=> {setAPL(event.target.value)}}/>
      <label>Difficulty</label>
      <input type="text" onChange={(event)=> {setDiff(event.target.value)}}/>
      <button onClick={addParty}>Add Player</button>
     </div>
    </div>
  );
}

export default App;
//Trying to get into repo