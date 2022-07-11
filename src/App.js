import React, { useState } from "react";
import './App.css';
import PersonForm from "./components/PersonForm";
import RealtimeList from "./components/RealtimeList";

const App = () => {
  const [editId, setEditId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <div className="container">
        <h3>Person Register</h3>
        <PersonForm 
          editId={editId} setEditId={setEditId} 
          name={name} setName={setName}
          email={email} setEmail={setEmail}/>
        {/* <ListPersons editId={editId} setEditId={setEditId} name={name} setName={setName}/> */}
        <RealtimeList 
          editId={editId} setEditId={setEditId} 
          name={name} setName={setName}
          email={email} setEmail={setEmail}/>
      </div>
    </div>
  )
}

export default App