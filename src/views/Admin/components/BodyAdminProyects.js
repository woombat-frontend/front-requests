import React, { useState, useCallback, useContext, useEffect } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon, Input } from 'antd';
import Context from '../../../GlobalState/context';
import Swal from 'sweetalert2';
import firebase from 'firebase'

import UserMale from '../../../assets/User-icon.svg';
import UserFemale from '../../../assets/User-icon-girl.svg';

/* Subs Screens */

import General from '../components/SubScreens/General';
import Archivos from '../components/SubScreens/Archivos';
import Actualizaciones from '../components/SubScreens/Actualizaciones';
import Entregables from '../components/SubScreens/Entregables';
import Solicitudes from '../components/SubScreens/Solicitudes';
import { send } from 'q';

const Menus = [
    { title: "Informe General", action: "general" },
    { title: "Archivos", action: "archivos" },
    { title: "Actualizaciones", action: "actualizaciones" },
    { title: "Entregables", action: "entregables" },
    { title: "Solicitudes", action: "solicitudes" }
]



const BodyAdminProyects = props => {

    const { state, actions } = useContext(Context)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    const [DiseñoVisual, setDiseñoVisual] = useState('25%')
    const [LogicaComponentes, setLogicaComponentes] = useState("25%")
    const [ArquitecturaComponentes, setArquitecturaComponentes] = useState("25%")
    const [Produccion, setProduccion] = useState("25%")
    const [renderOption, setRenderOption] = useState("general")
    const db = firebase.firestore()


    useEffect(() => {
        let arr = props.info.piechart_categories
        console.log(props.info)
        setDiseñoVisual(arr[0] + '%')
        setLogicaComponentes(arr[1] + "%")
        setArquitecturaComponentes(arr[2] + "%")
        setProduccion(arr[3] + "%")
    }, [])

    const validate = () => {
        let aproved = ''
        let sum =
            parseInt(DiseñoVisual.replace("%", "")) +
            parseInt(LogicaComponentes.replace("%", "")) +
            parseInt(ArquitecturaComponentes.replace("%", "")) +
            parseInt(Produccion.replace("%", ""))
        DiseñoVisual.length &&
        LogicaComponentes.length &&
        ArquitecturaComponentes.length &&
        Produccion.length 
        ?   
            sum
            === 100 ? aproved = 'complete' : 
            sum < 100  
            ? aproved = `Falta un ${100 - sum}%`
            : aproved = `Hay un excedente de un ${sum - 100}%`
        :
            aproved = 'empty'
        return aproved
    }

    const changePercent = () => {
        let validation = validate()
        validation === 'complete' ? 
            sendPercent()
        : 
            validation === 'empty' 
            ?    Toast.fire({
                    type: 'error',
                    title: 'No se pueden dejar campos vacíos' 
                })
            :   Toast.fire({
                    type: 'error',
                    title: validation
                })
    }

    const sendPercent = () => {
        let newPercent =
        [ parseInt(DiseñoVisual.replace("%", "")),
          parseInt(LogicaComponentes.replace("%", "")),
          parseInt(ArquitecturaComponentes.replace("%", "")),
          parseInt(Produccion.replace("%", ""))  ]

        db.doc(`responses/${props.name}`).set({
            piechart_categories: newPercent
        }, {merge: true})
        .then(() =>
            Toast.fire({
                type: 'success',
                title: 'Datos Enviados'
            })
        )
    }

    return (
        <div className="container-master-proyects-admin">
            <div className="container-master-admin-proyect-left">
                <div className="container-user-and-proyect">
                    <div className="container-user-data-1">
                        <img src={UserMale} className="img-gender-proyects-admin" />
                        <p className="text-gender-proyects-admin">{props.info.metadata.in_charge.name}</p>
                    </div>
                    <div>
                        <span className="span-title-proyect-admin">{props.name}</span>
                        <div className="container-status-proyect-admin">
                            <p className="status-proyect-admin">Estado: Iniciado</p>
                            <p className="change-status-text-proyect-admin">Cambiar estado</p>
                        </div>
                    </div>
                </div>
                <span className="span-separator-proyect-admin"></span>
                {
                    renderOption === 'general' ? 
                        <div className="container-master-pychart-module">
                            <div className="container-pychart-module">
                                <Icon type="pie-chart" className="pychart-icon" /><p className="title-edit-pychart-admin-proyect">Edicion del Pychart:</p>
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="highlight" /> Diseño Visual:</p>
                                <Input className="input-description-pychart" value={DiseñoVisual} onBlur={() => { !DiseñoVisual.length ? setDiseñoVisual("") : setDiseñoVisual(DiseñoVisual + "%")}} onFocus={() => setDiseñoVisual(DiseñoVisual.replace("%", ""))} onChange={e => setDiseñoVisual(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="interaction" /> Logica de los componentes:</p>
                                <Input className="input-description-pychart" value={LogicaComponentes} onBlur={() => { !LogicaComponentes.length ? setLogicaComponentes("") : setLogicaComponentes(LogicaComponentes + "%") }} onFocus={() => setLogicaComponentes(LogicaComponentes.replace("%", ""))} onChange={e => setLogicaComponentes(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="apartment" /> Arquitectura de las conexiones:</p>
                                <Input className="input-description-pychart" value={ArquitecturaComponentes} onBlur={() => { !ArquitecturaComponentes.length ? setArquitecturaComponentes("") : setArquitecturaComponentes(ArquitecturaComponentes + "%") }} onFocus={() => setArquitecturaComponentes(ArquitecturaComponentes.replace("%", ""))} onChange={e => setArquitecturaComponentes(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="cloud-upload" /> Despliegue en Producción:</p>
                                <Input className="input-description-pychart" value={Produccion} onBlur={() => { !Produccion.length ? setProduccion("") : setProduccion(Produccion + "%") }} onFocus={() => setProduccion(Produccion.replace("%", ""))} onChange={e => setProduccion(e.target.value)} />
                            </div>
                            <div className="buttom-save-pychart-data" onClick={changePercent}>
                                <p className="text-buttom-save-pychart-data"><Icon type="save" /> Guardar</p>
                            </div>
                        </div>

                    : renderOption === 'archivos' ? 
                        <h2>Archivos</h2>
                    : renderOption === 'actualizaciones' ? 
                        <h2>Actualizaciones</h2>
                    : renderOption === 'entregables' ? 
                        <h2>Entregables</h2>
                    : renderOption === 'solicitudes' ? 
                        <h2>Solicitudes</h2>
                    : <div/>
                }
            </div>
            <div className="container-master-admin-proyect-right">
                <div className="container-master-buttoms-proyect-admin">
                    {Menus.map(buttom => {
                        let active = false;
                        buttom.action === renderOption ? active = true : active = false
                        return (
                            <div onClick={() => setRenderOption(buttom.action)} className={`buttom-options-proyect-admin ${active ? "buttom-active": ""}`}>
                                <p className="text-buttom-options">{buttom.title}</p>
                                <span className="span-buttom-notifications-proyect-admin">5</span>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {
                        renderOption === 'general' ? 
                            <General path={props.name}/>
                        : renderOption === 'archivos' ? 
                            <Archivos />
                        : renderOption === 'actualizaciones' ? 
                            <Actualizaciones />
                        : renderOption === 'entregables' ? 
                            <Entregables />
                        : renderOption === 'solicitudes' ? 
                            <Solicitudes />
                        : <div/>
                    }
                </div>
            </div>
        </div>
    )
}

export default BodyAdminProyects;