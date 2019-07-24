import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC2T2wLIFqUdeFzZEMVNwqq848Q5X9gSUQ",
    authDomain: "front-requests.firebaseapp.com",
    databaseURL: "https://front-requests.firebaseio.com",
    projectId: "front-requests",
    storageBucket: "front-requests.appspot.com",
    messagingSenderId: "540371024328",
    appId: "1:540371024328:web:79337ccb3741aa35"
};

// firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db;

// import React, { useState, useEffect } from 'react'
// import logo from './logo.svg';
// import './App.css';
// import db from './FirebaseConfig/firestore'
// import firebase from 'firebase'
// import { Button, Input } from 'antd'


// const App = () => {

//     const [local, setLocal] = useState({})

//     useEffect(() => {
//         // db.collection('users').doc('nh1TudwtQzWkYG88NzM8r37o5vy2').get().then(res => setLocal(res.data()))
//         db.doc('users/nh1TudwtQzWkYG88NzM8r37o5vy2/projects/single_project').get().then(res => setLocal(res.data()))
//     })

//     const addItem = () => {
//         db.doc('users/nh1TudwtQzWkYG88NzM8r37o5vy2/projects/single_project_2').set({
//             name: "ronald",
//             age: 19
//         }).then(() => console.log("%c Success", "color: green; font-weight: bolder;"))
//             .catch(err => console.log(err))
//     }