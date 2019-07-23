import React from 'react';
import '../Styles/login.css';
import Computador from '../assets/Computador.svg';
import JustReact from '../assets/LogoJustReact.svg';
import WoombatLogo from'../assets/LogoWoombat.svg';

const Login = () =>{
    return(
        <React.Fragment>
            <div className="container-master">
                <div className="container-one">
                    <img src={Computador}></img>
                </div>
                <div className="container-two">

                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;