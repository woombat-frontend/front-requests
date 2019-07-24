import React from 'react';
import UserDefault from '../../../assets/User-icon.svg';
import { Icon } from 'antd';

const LeftMenu = () => {
    return(
        <div className="container-landing-left-menu">
            <img src={UserDefault} className="user-default-left-menu"></img>
            <div className="text-container-left-menu">
                <p className="text-left-menu">Usuario</p>
                <p className="text-left-menu">usuario@gmail.com</p>
                <div className="container-span-left-menu">
                    <span className="span-left-menu"><Icon type="plus" className="icon-span-plus" /> Crear proyecto</span>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;