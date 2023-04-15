import logo from './logo.svg';
import './App.css';
import Axios from "axios"
import {useEffect, useState} from "react"
function App() {
const [welcome,setWelcome]= useState("")
  useEffect(
    ()=>{
      Axios({
        method:"GET",
        url:"http://localhost:4000/"
      }).then((res)=>{
        setWelcome(res.data)
      })
    },
    []
  )
  
  
  return (
    <div className="App">
      <header className="App-header">
      {welcome}
      </header>
    </div>
  );
}

export default App;
