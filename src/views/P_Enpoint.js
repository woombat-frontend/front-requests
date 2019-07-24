import React, {useState, useEffect, useContext} from 'react' 
import fire from '../FirebaseConfig/auth'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
// import db from '../FirebaseConfig/firestore'

import { Button } from 'antd'
import Context from '../GlobalState/context';


const P_Enpoint = props => {

    const {state, actions} = useContext(Context)
    const [localData, setLocalData] = useState({})
    const db = firebase.firestore()

    useEffect(() => {
        const user = state.fire_init.auth().currentUser

        user ? 
            db.doc(`users/${user.uid}/`)
            .get().then(res => {
                console.log(res.data())
                setLocalData(res.data())
            })
        :
            props.history.push('login')
    }, [])

    

    return (
        <div className=''>
            <Button type="primary" onClick={() => console.log(localData)} > Check </Button>
            <Button type="primary" onClick={() => state.fire_init.auth().signOut()} > Cerrar Sesion </Button>
        </div>
    )
}

export default withRouter(P_Enpoint)