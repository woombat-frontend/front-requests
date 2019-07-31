import React from 'react';
import { Icon } from 'antd';


const Solicitudes = () =>{
    return(
        <div className="container-master-solicitudes">
            <div className="container-master-divs">
                <div className="container-master-solicitud">
                    <div>
                        <p className="text-solicitud-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                    <span className="span-solicitud-body"></span>
                    <div>
                        <p className="text-state-solicitud-body">Estado: Enviado</p>
                    </div>
                    <div>
                        <div className="buttom-solicitud-body">
                            <p className="text-buttom-solicitud-body">Cancelar Solicitud</p>
                        </div>
                        <div className="buttom-solicitud-body">
                            <p className="text-buttom-solicitud-body">Cancelar Solicitud</p>
                        </div>
                    </div>
                </div>
                <div className="container-master-solicitud">
                    <div>
                        <p className="text-solicitud-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                    <span className="span-solicitud-body"></span>
                    <div>
                        <p className="text-state-solicitud-body">Estado: Enviado</p>
                    </div>
                    <div>
                        <div className="buttom-solicitud-body">
                            <p className="text-buttom-solicitud-body">Cancelar Solicitud</p>
                        </div>
                        <div className="buttom-solicitud-body">
                            <p className="text-buttom-solicitud-body">Cancelar Solicitud</p>
                        </div>
                    </div>
                </div>
                <div className="container-master-solicitud-new">
                    <div className="container-text-new">
                        <Icon type="plus" className="icon-solicitud-new"/><p className="text-solicitud-new">Nueva Solicitud</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solicitudes;