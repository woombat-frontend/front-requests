import React, { useContext, useEffect } from 'react';
import {BrowserRouter} from "react-router-dom";
import Router from './router/Router';
import Context from './GlobalState/context';
import firebase from 'firebase'
import firebaseConfig from './FirebaseConfig/auth'


const App = () => {

  const {state, actions} = useContext(Context)

  useEffect(() => {
    actions({ type: 'setState', payload: { ...state, fire_init: firebase.initializeApp(firebaseConfig)}})
  }, [])


  return (
    < BrowserRouter >
      <Router />
    </BrowserRouter >
  )
}

  

export default App;