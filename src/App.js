import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import db from './FirebaseConfig/firestore'
import firebase from 'firebase'
import { Button, Input } from 'antd'


const App = () => {

  const [local, setLocal] = useState({})
  
  useEffect(() => {
    // db.collection('users').doc('nh1TudwtQzWkYG88NzM8r37o5vy2').get().then(res => setLocal(res.data()))
    db.doc('users/nh1TudwtQzWkYG88NzM8r37o5vy2/projects/single_project').get().then(res => setLocal(res.data()))
  })

  const addItem = () => {
    db.doc('users/nh1TudwtQzWkYG88NzM8r37o5vy2/projects/single_project_2').set({
      name: "ronald", 
      age: 19
    }).then(() => console.log("%c Success", "color: green; font-weight: bolder;"))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Button type="primary" onClick={addItem}>Add</Button>
      <Button type="primary" onClick={()=> console.log(local)}>Check</Button>
    </div>
  )
}

export default App;
