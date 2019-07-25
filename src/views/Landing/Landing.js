import React, {useState, useEffect, useContext} from 'react'
import '../../Styles/Landing.css';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import LandingBody from './components/LandingBody';
import firebase from 'firebase'
import Context from '../../GlobalState/context'

const Landing = () => {

    const { state, actions } = useContext(Context)
    const db = firebase.firestore()
    const [userPersonalInfo, setUserPersonalInfo] = useState({name: "User", gender: "m"})
    const user = state.fire_init.auth().currentUser

    useEffect(() => {
        db.doc(`users/${user.uid}/`)
            .get().then(res => {
                setUserPersonalInfo({name: res.data().name, gender: res.data().gender})
            })
    }, [])

    return (
        <div className="container-main-landing">
            <Header name={userPersonalInfo.name} gender={userPersonalInfo.gender}/>
            <div className="container-body-landing">
                <LeftMenu name={userPersonalInfo.name} gender={userPersonalInfo.gender} />
                <div className="container-body-landing">
                    <LandingBody />
                </div>
            </div>
        </div>
    )
}

export default Landing