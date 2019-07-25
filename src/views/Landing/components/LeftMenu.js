import React, { useContext, useEffect, useState } from 'react';
import UserDefaultBoy from '../../../assets/User-icon.svg';
import UserDefaultGirl from '../../../assets/User-icon-girl.svg';
import { Icon } from 'antd';
import {Link} from "react-router-dom";
import Context from '../../../GlobalState/context'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

const LeftMenu = props => {

    const {state, actions} = useContext(Context)
    const user = state.fire_init.auth().currentUser
    const [name, setName] = useState("User")
    const db = firebase.firestore()

    const titulos = [
        { Nombre: "Crear Proyecto", url: "crear", icon: "plus" },
        {Nombre: "Proyectos", url: "proyectos", icon: "folder-open"},
        {Nombre: "Historial", url: "historial", icon: "file-search"},
        {Nombre: "Solicitudes", url: "solicitudes", icon: "plus-circle"},
        {Nombre: "Entregas", url: "entregas", icon: "file-done"}
    ]

    const changeCurrentMenuOption = option => {
        console.log(option)
        actions({type: "setState", payload: {...state, current_menu_option: option }})
    }

    return(
        <div className="container-landing-left-menu">
            <img src={props.gender === "f" ? UserDefaultGirl : props.gender === "m" ? UserDefaultBoy : ""} className="user-default-left-menu"></img>
            <div className="text-container-left-menu">
                <p className="text-left-menu">{props.name}</p>
                <p className="text-left-menu">{user.email}</p>

                <div className="container-texts-signout">
                    <div className="container-master-text-menu-left">
                        {titulos.map((titulo, i)=>{
                            return( 
                                titulo.Nombre === state.current_menu_option ?
                                    <div className="text-container-left-menu-singled">
                                        <div className="container-span-left-menu-singled">
                                            <span className="span-left-menu-singled"><Icon type={titulo.icon} className="icon-span-plus" /> {titulo.Nombre}</span>
                                            <span className="mark-left-menu"></span>
                                        </div>
                                    </div>
                                    
                                :
                                    <div onClick={() => changeCurrentMenuOption(titulo.Nombre)} key={i} className="container-text-menu-left">
                                        <p className="text-menu-left"><Icon type={titulo.icon} /> {titulo.Nombre}</p>
                                        <div>
                                            <Icon type="right" className="icon-title-menu-left" />
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div onClick={() => state.fire_init.auth().signOut().then(() => props.history.push("/"))} className="container-text-close-session">
                            <p className="text-close-session"><Icon type="logout" /> <span>Cerrar Sesión</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LeftMenu);