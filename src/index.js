import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import firebaseConfig from './FirebaseConfig/auth';
import firebase from 'firebase'

import Context from './GlobalState/context'
import useGlobalState from './GlobalState/useGlobalState'

const Index = () => {
    const store = useGlobalState();

    return (
        <Context.Provider value={store} >
            <App />
        </Context.Provider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 
