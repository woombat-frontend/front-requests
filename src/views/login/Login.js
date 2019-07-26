
import React, { useState, useEffect, useContext } from 'react';
import '../../Styles/login.css';
import JustReact from '../../assets/LogoJustReact.svg';
import WoombatLogo from '../../assets/LogoWoombat.svg';
import { Input, Button, Icon, Form } from 'antd';
import Ajax from '../../assets/Ajax.svg';
import Background from '../../assets/bg.svg';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import Context from '../../GlobalState/context';

import Swal from 'sweetalert2';
import '../../Styles/AlertStyles.css'

const Login = props => {

    const {state, actions} = useContext(Context)
    const [data, setData] = useState({ user: "", password: "" })
    const [user, setUser] = useState("")
    const [showLogin, setShowLogin] = useState(null)
    const db = firebase.firestore()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    useEffect(() => {
        authListener()
    }, [])

    const login = () => {
        state.fire_init.auth().signInWithEmailAndPassword(data.user, data.password)
            .then(() => {
                setShowLogin(false)
                props.history.push('landing')
            })
            .catch(() => {
                Toast.fire({
                    type: 'error',
                    title: 'Datos incorrectos, intente de nuevo'
                })
            })

        
    }

    const authListener = () => {
        state.fire_init.auth().onAuthStateChanged(user => {

            
            if (user) {
                setUser(user)
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
                    })
                
                    .then(() => props.history.push('landing'))

            } else {
                setShowLogin(true)
                setUser(null)

                // console.log("%c Signed Out ", "color: red; font-weight: bolder");
            }

        })
    }

    return (
        <React.Fragment>
            {
                showLogin ?
                    <div onKeyDown={e => e.keyCode === 13 ? login() : console.log()} className="container-master">
                        <div className="background"><img src={Background}></img></div>
                        <div className="container-login">
                            <div className="login-modal">
                                <div className="frontend-logo-container">
                                    <img src={JustReact} className="frontend-logo"></img>
                                </div>
                                <div className="ajax-container">
                                    <img src={Ajax} className="ajax-logo"></img>
                                </div>
                                <div className="input-container">
                                    <p className="title-input">Correo Electronico:</p>
                                    <Input
                                        placeholder="Ingrese Correo"
                                        className="input-login"
                                        onChange={e => setData({ ...data, user: e.target.value })}
                                    />
                                </div>
                                <div className="input-container">
                                    <p className="title-input">Contraseña:</p>
                                    <Input
                                        placeholder="Ingrese Contraseña"
                                        type="password"
                                        className="input-login"
                                        onChange={e => setData({ ...data, password: e.target.value })}
                                    />
                                </div>
                                    <div className="input-container">
                                        <Button
                                            type="primary submit"
                                            // type="submit"
                                            className="button-login"
                                            onClick={login}
                                        >
                                            <Icon type="login" /> Iniciar Sesion</Button>
                                    </div>
                                
                                <div className="container-copyright">
                                    <p className="text-copyright">Producto de</p>
                                    <a href="http://woombatcg.com/" target="_blank"><img src={WoombatLogo} className="woombat-logo"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div/>
            }
        </React.Fragment>
    )
}

export default withRouter(Login);