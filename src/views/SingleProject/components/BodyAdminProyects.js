import React, { useState, useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon, Input } from 'antd';
import Context from '../../../GlobalState/context';

// Test SweetAlert
import Sweet from '../../SweetAlert';

import UserMale from '../../../assets/User-icon.svg';
import UserFemale from '../../../assets/User-icon-girl.svg';

const Menus = [
    { title: "Informe General", action: "general" },
    { title: "Archivos", action: "archivos" },
    { title: "Actualizaciones", action: "actualizaciones" },
    { title: "Entregables", action: "entregables" },
    { title: "Solicitudes", action: "solicitudes" }
]

const BodyAdminProyects = () => {

    const { state, actions } = useContext(Context)
    const [percent, setPercent] = useState("")

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
                <div className="container-master-pychart-module">
                    <div className="container-pychart-module">
                        <Icon type="pie-chart" className="pychart-icon" /><p className="title-edit-pychart-admin-proyect">Edicion del Pychart:</p>
                    </div>
                    <div className="container-pychart-apartado">
                        <p className="title-description-pychart"><Icon type="highlight" /> Diseño Visual:</p>
                        <Input className="input-description-pychart" />
                    </div>
                    <div className="container-pychart-apartado">
                        <p className="title-description-pychart"><Icon type="interaction" /> Logica de los componentes:</p>
                        <Input className="input-description-pychart" />
                    </div>
                    <div className="container-pychart-apartado">
                        <p className="title-description-pychart"><Icon type="apartment" /> Arquitectura de las conexiones:</p>
                        <Input className="input-description-pychart" />
                    </div>
                    <div className="container-pychart-apartado">
                        <p className="title-description-pychart"><Icon type="cloud-upload" /> Despliegue en Producción:</p>
                        <Input className="input-description-pychart" value={percent} onBlur={() => setPercent(percent + "%")} onFocus={() => setPercent(percent.replace("%", ""))} onChange={e => setPercent(e.target.value)} />
                    </div>
                    <div className="buttom-save-pychart-data">
                        <p className="text-buttom-save-pychart-data"><Icon type="save" /> Guardar</p>
                    </div>
                </div>
            </div>
            <div className="container-master-admin-proyect-right">
                <div className="container-master-buttoms-proyect-admin">
                    {Menus.map(buttom => {
                        return (
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