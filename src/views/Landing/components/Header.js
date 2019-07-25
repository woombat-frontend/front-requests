import React, { useContext } from 'react';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import Context from '../../../GlobalState/context';

const Header = props =>{

    const {state, actions} = useContext(Context)

    return(
        <div className="container-landing-master">
            <div className="container-header-landing">
                <div className="icon-container-landing">
                    <a href="#" className="icon-landing"><Icon type="bell" /></a>
                </div>
                <div>
                    <h4 className="text-header-landing">{state.personal_info.gender === "f" ? "Bienvenida" : "Bienvenido"}, {state.personal_info.name}</h4>
                </div>
                <span className="bar-separator-landing"></span>
                <div>
                    <h4 onClick={() => state.fire_init.auth().signOut().then(() => props.history.push("/"))} className="text-header-landing-two"><Icon type="logout" className="icon-header-sign-out" /> Cerrar Sesión</h4>
                </div>
            </div>
        </div>
    )

}

export default withRouter(Header);