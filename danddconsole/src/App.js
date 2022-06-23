import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

//pls work

function App() {
  const getQuote = () => {
    axios.get('https://www.dnd5eapi.co/api/monsters/')
    .then(response => {
        console.log(response.data)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
}

export default App