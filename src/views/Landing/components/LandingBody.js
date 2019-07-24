import React from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon } from 'antd';

const LandingBody = () =>{
    return(
        <div className="container-body-empty">
            <img src={People} className="img-empty-body"></img>
            <p className="body-empty-text">Al parecer no tienes ningun proyectos aún</p>
            <div className="buttom-create-proyect">
                <p className="text-buttom-create-proyect"><Icon type="plus-circle" /> Crear Proyecto</p>
            </div>
        </div>
    )
}

export default LandingBody;