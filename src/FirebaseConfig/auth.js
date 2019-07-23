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

const fire = firebase.initializeApp(firebaseConfig)
export default fire;