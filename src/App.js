import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from "react-router-dom";
import Router from './router/Router';
import Context from './GlobalState/context';
import firebase from 'firebase'
import firebaseConfig from './FirebaseConfig/auth'


const App = () => {

  const {state, actions} = useContext(Context)
  const [show, setShow] = useState(false)

  useEffect(async () => {
    await actions({ type: 'setState', payload: { ...state, fire_init: firebase.initializeApp(firebaseConfig)}})
    await setShow(true)
  }, [])


  return (
    show ? 
      < BrowserRouter >
        <Router />
      </BrowserRouter >
    : 
      <div></div>
  )
}

  

export default App;