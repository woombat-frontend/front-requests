import React, {useState, useEffect, useContext} from 'react' 
import Context from '../GlobalState/context';
import firebase from 'firebase'
import { Button } from 'antd'


const MappingTest = () => {

    const {state, actions} = useContext(Context)
    const [localUsers, setLocalUsers] = useState([])
    const [localUsersId, setLocalUsersId] = useState([])
    const db = firebase.firestore()

    const getUsers = async () => { //Funcion del panel inicial para renderizar los usuarios

        db.collection('users').get().then(querySnapshot => {
            setLocalUsers( querySnapshot.docs.map(doc => doc.data() ))
            setLocalUsersId(querySnapshot.docs.map(doc => doc.id) )
        })
        
    }

    return (
        <div style={{padding: '2em'}}>
            
            <Button onClick={getUsers}>Test</Button>
            <Button onClick={() => console.log()}>Local Users</Button>
            <Button onClick={() => console.log()}>Local Users Id's</Button>
        </div>
    )
}

export default MappingTest