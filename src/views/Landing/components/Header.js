import React from 'react';
import { Icon } from 'antd';

const Header = () =>{
    return(
        <div className="container-landing-master">
            <div className="container-header-landing">
                <div className="icon-container-landing">
                    <a href="#" className="icon-landing"><Icon type="bell" /></a>
                </div>
                <div>
                    <h4 className="text-header-landing">Bienvenido, Usuario</h4>
                </div>
                <span className="bar-separator-landing"></span>
                <div>
                    <h4 className="text-header-landing-two">Cerrar Sesión</h4>
                </div>
            </div>
        </div>
    )

}

export default Header;