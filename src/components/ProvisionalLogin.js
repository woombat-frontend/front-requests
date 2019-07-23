import React, {useState, useEffect} from 'react' 
import {Input, Button} from 'antd'
import '../Styles/provisional.css'
import fire from '../FirebaseConfig/auth'

const ProvisionalLogin = () => {

    const [data, setData] = useState({user: "", password: ""})
    
    const login = () => {
        fire.auth().signInWithEmailAndPassword(data.user, data.password)
            .then(() => console.log("%c Success", "color: green; font-weight: bolder;"))
            .catch(() => console.log("%c Error", "color: red; font-weight: bolder;"))
    }

    const signOut = () => {
        fire.auth().signOut()
        .then(() => console.log("%c Signed out", "color: blue; font-weight: bolder;"))
        .catch(() => console.log("%c Error", "color: red; font-weight: bolder;"))
    }

    return (
        <div className="main-main-container">
            <div className="provisional-login-main-container">

                <h3 className="t1">User</h3>
                <Input className="i1" onChange={e => setData({ ...data, user: e.target.value })} />

                <h3 className="t2">Password</h3>
                <Input className="i2" type="password" onChange={e => setData({ ...data, password: e.target.value })} />
            </div>
            
            <div className="btn-container">
                <Button onClick={login} type="primary"> Login </Button>
                <Button style={{marginLeft: '2em'}} onClick={signOut} type="primary"> Sign Out </Button>

            </div>
        </div>
        
        
    )
}

export default ProvisionalLogin