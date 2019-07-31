import React, { useContext, useEffect, useState } from 'react';
import UserDefaultBoy from '../../../assets/User-icon.svg';
import UserDefaultGirl from '../../../assets/User-icon-girl.svg';
import { Icon } from 'antd';
import {Link} from "react-router-dom";
import Context from '../../../GlobalState/context'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

const LeftMenuAdmin = props => {

    const {state, actions} = useContext(Context)
    const [name, setName] = useState("User")
    const db = firebase.firestore()

    const titulos = [
        { Nombre: "Inicio", url: "inicio", icon: "home" },
        { Nombre: "Proyectos", url: "proyectos", icon: "project" },
        { Nombre: "Configuraciones", url: "configuraciones", icon: "tool"}
    ]

    const changeCurrentMenuOption = option => {
        actions({type: "setState", payload: {...state, current_menu_option_admin: option }})
    }

    return(
        <div className="container-left-menu-admin">
            <img src={state.personal_info.gender === "f" ? UserDefaultGirl : state.personal_info.gender === "m" ? UserDefaultBoy : ""} className="user-default-left-menu"></img>
            <div className="text-container-left-menu">
                <p className="text-left-admin">{state.personal_info.name}</p>
                <p className="text-left-admin">{state.personal_info.email}</p>

                <div className="container-texts-signout">
                    <div className="container-master-text-menu-left">
                        {titulos.map((titulo, i)=>{
                            return( 
                                titulo.Nombre === state.current_menu_option_admin ?
                                    <div className="text-container-left-menu-singled-admin">
                                        <div className="container-span-left-menu-singled">
                                            <span className="span-left-menu-admin"><Icon type={titulo.icon} className="icon-span-plus" /> {titulo.Nombre}</span>
                                            <span className="mark-left-menu"></span>
                                        </div>
                                    </div>
                                    
                                :
                                    <div onClick={() => changeCurrentMenuOption(titulo.Nombre)} key={i} className="container-text-menu-left">
                                        <p className="text-left-admin-title"><Icon type={titulo.icon} /> {titulo.Nombre}</p>
                                        <div>
                                            <Icon type="right" className="icon-left-menu-admin" />
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div onClick={() => state.fire_init.auth().signOut().then(() => props.history.push("/"))} className="container-buttom-session-admin">
                            <p className="text-close-session"><Icon type="logout" /> <span>Cerrar Sesión</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LeftMenuAdmin);