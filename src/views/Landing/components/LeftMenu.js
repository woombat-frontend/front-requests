import React, { useContext } from 'react';
import UserDefault from '../../../assets/User-icon.svg';
import { Icon } from 'antd';
import {Link} from "react-router-dom";
import Context from '../../../GlobalState/context'

const LeftMenu = () => {

    const {state, actions} = useContext(Context)
    const user = state.fire_init.auth().currentUser

    const titulos = [
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
            <img src={UserDefault} className="user-default-left-menu"></img>
            <div className="text-container-left-menu">
                <p className="text-left-menu">Usuario</p>
                <p className="text-left-menu">{user.email}</p>
                <div className="container-span-left-menu">
                    <span className="span-left-menu"><Icon type="plus" className="icon-span-plus" /> Crear proyecto</span>
                    <span className="mark-left-menu"></span>
                </div>
                <div className="container-texts-signout">
                    <div className="container-master-text-menu-left">
                        {titulos.map((titulo, i)=>{
                            return(
                                <div onClick={() => changeCurrentMenuOption(titulo.Nombre)} key={i} className="container-text-menu-left">
                                    <p className="text-menu-left"><Icon type={titulo.icon} /> {titulo.Nombre}</p>
                                    <div>
                                        <Icon type="right" className="icon-title-menu-left" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <div className="container-text-close-session">
                            <p className="text-close-session"><Icon type="logout" /> Cerrar Sesión</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;