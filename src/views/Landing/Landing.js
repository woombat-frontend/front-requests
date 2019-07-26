import React, {useState, useEffect, useContext} from 'react'
import '../../Styles/Landing.css';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import LandingBody from './components/LandingBody';
import firebase from 'firebase'
import config from '../../FirebaseConfig/auth'
import Context from '../../GlobalState/context'
import Swal from 'sweetalert2';
import '../../Styles/AlertStyles.css'


const Landing = () => {

    const { state, actions } = useContext(Context)
    const user = state.fire_init.auth().currentUser
    const [show, setShow] = useState(false)
    const db = firebase.firestore()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });


    useEffect(() => {
        
        state.fire_init.auth().onAuthStateChanged(user => {
            if (user) {
                db.doc(`users/${user.uid}/`).get()
                    .then(res => {
                        actions({
                            type: 'setState',
                            payload: {
                                ...state,
                                personal_info: {
                                    name: res.data().name,
                                    gender: res.data().gender,
                                    email: state.fire_init.auth().currentUser.email,
                                    uid: state.fire_init.auth().currentUser.uid
                                }
                            }
                        })
                        Toast.fire({
                            type: 'success',
                            title: res.data().gender === "f" ? "Bienvenida" : "Bienvenido" + " " + res.data().name
                        })
                    })

                    .then(() => setShow(true))
            } 
        })  
    }, [])

    return (
        show ? 
            <div className="container-main-landing">
                <Header />
                <div className="container-body-landing">
                    <LeftMenu />
                    <div className="container-body-landing">
                        <LandingBody />
                    </div>
                </div>
            </div>
        : 
        <div></div>
    )
}

export default Landing