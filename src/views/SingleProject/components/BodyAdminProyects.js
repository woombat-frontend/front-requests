import React, { useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon } from 'antd';
import Context from '../../../GlobalState/context';

// Test SweetAlert
import Sweet from '../../SweetAlert';

import UserMale from '../../../assets/User-icon.svg';
import UserFemale from '../../../assets/User-icon-girl.svg';

const Menus = [
    {title: "Informe General", action: "general"},
    {title: "Lista de Tareas", action: "tareas"},
    {title: "Actualizaciones", action: "actualizaciones"},
    {title: "Entregables", action: "entregables"},
    {title: "Solicitudes", action: "solicitudes"}
]

const BodyAdminProyects = () => {

    const {state, actions} = useContext(Context)
 
    return (
        <div className="container-master-proyects-admin">
            <div className="container-master-admin-proyect-left">
                <div className="container-user-and-proyect">
                    <div className="container-user-data-1">
                        <img src={UserMale} className="img-gender-proyects-admin" />
                        <p className="text-gender-proyects-admin">Ronald Prato</p>
                    </div>
                    <div>
                        <span className="span-title-proyect-admin">Davivienda</span>
                        <div className="container-status-proyect-admin">
                            <p className="status-proyect-admin">Estado: APROBADO</p>
                            <p className="change-status-text-proyect-admin">Cambiar estado</p>
                        </div>
                    </div>
                </div>
                <span className="span-separator-proyect-admin"></span>
                <div>

                </div>
            </div>
            <div className="container-master-admin-proyect-right">
                <div className="container-master-buttoms-proyect-admin">
                    {Menus.map(buttom =>{
                        return(
                        <div className="buttom-options-proyect-admin">
                            <p className="text-buttom-options">{buttom.title}</p>
                            <span className="span-buttom-notifications-proyect-admin">5</span>
                        </div>
                        )
                    })}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default BodyAdminProyects;