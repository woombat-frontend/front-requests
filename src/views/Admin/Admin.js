import React, {useState, useEffect, useContext} from 'react'
import '../../Styles/AdminView.css';
import firebase from 'firebase'
import config from '../../FirebaseConfig/auth'
import Context from '../../GlobalState/context'
import Swal from 'sweetalert2';
import '../../Styles/AlertStyles.css'
import mp3 from '../../assets/pika.mp3'
import HeaderAdmin from './components/HeaderAdmin';
import LeftMenuAdmin from './components/LeftMenuAdmin';
import BodyAdmin from './components/BodyAdmin';


const Landing = () => {

    const { state, actions } = useContext(Context)
    const user = state.fire_init.auth().currentUser
    const [show, setShow] = useState(false)
    const db = firebase.firestore()
    var playSound = new Audio(mp3);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    const [easterEgg, setEasterEgg] = useState([])
    const [pikachu, setPikachu] = useState(false)


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

    const keyListener = k => {
        setTimeout(() => {
            setEasterEgg([])
        }, 1500)
        setEasterEgg([...easterEgg, k])
        if (easterEgg.join('-') === '81-49-87-50-69-51-82-52-84') {
            setPikachu(true)
            setTimeout(() => setPikachu(false), 1500)
            
            
            playSound.play()
        }
            
        
    }

    return (
        show ? 
            <div tabIndex="-1" onKeyDown={e => keyListener(e.keyCode)} className="container-main-landing">
                {
                    pikachu ? 
                        <div className="pikachu-container"> 
                            <audio id="pikamp3">
                                <source src="../assets/pika.mp3" type="audio/ogg" /> 
                            </audio>
                            <img src="https://i.pinimg.com/originals/f3/e1/b8/f3e1b8019f160f88531d8af792716b4f.png" alt="Pikachu"/> 
                        </div>
                    : <div/>
                }
                <HeaderAdmin />
                <div className="container-body-landing">
                    <LeftMenuAdmin />
                    <div className="container-body-landing">
                        <BodyAdmin />
                    </div>
                </div>
            </div>
        : 
        <div></div>
    )
}

export default Landing