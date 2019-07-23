import React from 'react';
import '../Styles/login.css';
import JustReact from '../assets/LogoJustReact.svg';
import WoombatLogo from'../assets/LogoWoombat.svg';
import { Input, Button, Icon  } from 'antd';
import Ajax from '../assets/Ajax.svg';
import Background from '../assets/bg.svg';

const Login = () => {
    return(
        <React.Fragment>
            <div className="container-master">
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
                            <Input placeholder="Ingrese Correo" className="input-login" />
                        </div>
                        <div className="input-container">
                            <p className="title-input">Contraseña:</p>
                            <Input placeholder="Ingrese Contraseña" type="password" className="input-login" />
                        </div>
                        <div className="input-container">
                            <Button type="primary" className="button-login"><Icon type="login" /> Iniciar Sesion</Button>
                        </div>
                        <div className="container-copyright">
                            <p className="text-copyright">Producto de</p>
                            <a href="http://woombatcg.com/" target="_blank"><img src={WoombatLogo} className="woombat-logo"></img></a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;