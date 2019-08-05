import React, { useState, useCallback, useContext, useEffect } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon, Input, Button } from 'antd';
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
import TiempoTotal from './SubScreens/TiempoTotal';

const Menus = [
    { title: "Informe General", action: "general" },
    { title: "Archivos", action: "archivos" },
    { title: "Actualizaciones", action: "actualizaciones" },
    { title: "Entregables", action: "entregables" },
    { title: "Solicitudes", action: "solicitudes" }
]



const BodyAdminProyects = props => {

    const { state, actions } = useContext(Context)
    const db = firebase.firestore()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    const [completeProgress, setCompleteProgress] = useState(0)
    const [renderOption, setRenderOption] = useState("general")

    const [DiseñoVisual, setDiseñoVisual] = useState('25%')
    const [LogicaComponentes, setLogicaComponentes] = useState("25%")
    const [ArquitecturaComponentes, setArquitecturaComponentes] = useState("25%")
    const [Produccion, setProduccion] = useState("25%")
    
    const [DiseñoVisualTotal, setDiseñoVisualTotal] = useState('0%')
    const [LogicaComponentesTotal, setLogicaComponentesTotal] = useState("0%")
    const [ArquitecturaComponentesTotal, setArquitecturaComponentesTotal] = useState("0%")
    const [ProduccionTotal, setProduccionTotal] = useState("0%")
    

    useEffect(() => {
        let pie = props.info.piechart_categories
        let bar = props.info.total_time
        let inputs = [bar[0], bar[1], bar[2], bar[3]]
        let finalArr = []

        // console.log("SUUUUBJECTs => ", props.subjects)

        setDiseñoVisual(pie[0] + '%')
        setLogicaComponentes(pie[1] + "%")
        setArquitecturaComponentes(pie[2] + "%")
        setProduccion(pie[3] + "%")

        setDiseñoVisualTotal(bar[0] + '%')
        setLogicaComponentesTotal(bar[1] + "%")
        setArquitecturaComponentesTotal(bar[2] + "%")
        setProduccionTotal(bar[3] + "%")
        // console.log(inputs)
        
        inputs.map(x => finalArr.push((x * 25) / 100))
        // console.log(finalArr)
        setCompleteProgress(
            finalArr.reduce((x, y) => x + y) % 1 !== 0 ? 
                Math.ceil(finalArr.reduce((x, y) => x + y))
                : finalArr.reduce((x, y) => x + y)
        )


        // actions({ type: 'setState', payload: { ...state, total_time: [bar[0], bar[1], bar[2], bar[3]] }})
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

    const validateTotal = () => {
        let aproved =  ''

        DiseñoVisualTotal.length &&
        LogicaComponentesTotal.length &&
        ArquitecturaComponentesTotal.length &&
        ProduccionTotal.length
        ? 
            parseInt(DiseñoVisualTotal.replace("%", "")) <= 100 &&
            parseInt(LogicaComponentesTotal.replace("%", "")) <= 100 &&
            parseInt(ArquitecturaComponentesTotal.replace("%", "")) <= 100 &&
            parseInt(ProduccionTotal.replace("%", "")) <= 100
            ? aproved = 'complete'
            : aproved = 'exeed'
        : 
            aproved = 'empty'

        return aproved
    }

    const changeTotal = () => {
        let validation = validateTotal()
        // console.log(validation)
        validation === 'complete' ?
            sendTotal()
        : 
            validation === 'empty' 
                ? Toast.fire({
                    type: 'error',
                    title: 'No se pueden dejar campos vacíos'
                })
            : validation === 'exeed'
            ?   Toast.fire({
                    type: 'error',
                    title: 'Ningún campo puede exceder el 100%'
                })
            : Toast.fire({
                type: 'error',
                title: 'Error del servidor'
            })

        let inputs = [
            parseInt(DiseñoVisualTotal.replace("%", "")),
            parseInt(LogicaComponentesTotal.replace("%", "")),
            parseInt(ArquitecturaComponentesTotal.replace("%", "")),
            parseInt(ProduccionTotal.replace("%", ""))
        ]
        
    }

    const sendTotal = async () => {
        let newTotal =
            [parseInt(DiseñoVisualTotal.replace("%", "")),
            parseInt(LogicaComponentesTotal.replace("%", "")),
            parseInt(ArquitecturaComponentesTotal.replace("%", "")),
            parseInt(ProduccionTotal.replace("%", ""))],
            aux = []
        
        db.doc(`responses/${props.name}`).set({
            total_time: newTotal
        }, { merge: true })
            .then(() => Toast.fire({
                type: 'success',
                title: 'Datos Enviados'
            })
        )
        
        newTotal.map(x => aux.push((x * 25) / 100))
        setCompleteProgress(
            aux.reduce((x, y) => x + y)
        )
    }

    const sendPercent = () => {
        let newPercent =
        [ parseInt(DiseñoVisual.replace("%", "")),
          parseInt(LogicaComponentes.replace("%", "")),
          parseInt(ArquitecturaComponentes.replace("%", "")),
          parseInt(Produccion.replace("%", ""))  ]
        Toast.fire({
            type: 'success',
            title: 'Datos Enviados'
        })
        db.doc(`responses/${props.name}`).set({
            piechart_categories: newPercent
        }, {merge: true})
    }

    return (
        <div className="container-master-proyects-admin">
            <div className="buttom-goback-admin" onClick={() => props.back()}>
                <p className="text-buttom-goback-admin"><Icon type="arrow-left" /> Volver Atras</p>
            </div>
            <div className="container-master-admin-proyect-left">
                <div className="container-user-and-proyect">
                    <div className="container-user-data-1">
                        <img src={UserMale} className="img-gender-proyects-admin" />
                        <p className="text-gender-proyects-admin">{props.info.metadata.in_charge.name}</p>
                    </div>

                    <div className="container-status-info-profile-admin">
                        <span className="span-title-proyect-admin">{completeProgress}% Completado</span>
                    </div>
                    <div className="container-proyect-title">
                        <p className="change-status-text-proyect-admin">Proyecto:</p>
                    </div>
                    <div className="container-proyect-text">
                        <p className="change-status-text-proyect-admin">{props.name}</p>

                    </div>
                </div>
                <div className="container-span-separator-admin"><span className="span-separator-proyect-admin"></span></div>
                {
                    renderOption === 'general' ? 
                        <div className="container-master-pychart-module">
                            <div className="container-pychart-module">
                                <div className="graph-icon"><Icon type="pie-chart" className="pychart-icon" /></div>
                                <div className={`buttom-show-graph ${renderOption === "general" ? "buttom-active" : ""}`} onClick={() => setRenderOption('general')}>
                                    <p className="title-buttom-show-graph">Tiempo dedicado</p>
                                </div>
                                <div className={`buttom-show-graph ${renderOption === "tiempo_total" ? "buttom-active" : ""}`} onClick={() => setRenderOption('tiempo_total')}>
                                    <p className="title-buttom-show-graph">Total</p>
                                </div>
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

                    : renderOption === 'tiempo_total' ?

                        <div className="container-master-pychart-module">
                            <div className="container-pychart-module">
                                <div className="graph-icon"><Icon type="pie-chart" className="pychart-icon" /></div>
                                <div className={`buttom-show-graph ${renderOption === "general" ? "buttom-active" : ""}`} onClick={() => setRenderOption('general')}>
                                    <p className="title-buttom-show-graph">Tiempo dedicado</p>
                                </div>
                                <div className={`buttom-show-graph ${renderOption === "tiempo_total" ? "buttom-active" : ""}`} onClick={() => setRenderOption('tiempo_total')}>
                                    <p className="title-buttom-show-graph">Total</p>
                                </div>
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="highlight" /> Diseño Visual:</p>
                                    <Input className="input-description-pychart" value={DiseñoVisualTotal} onBlur={() => { !DiseñoVisualTotal.length ? setDiseñoVisualTotal("") : setDiseñoVisualTotal(DiseñoVisualTotal + "%") }} onFocus={() => setDiseñoVisualTotal(DiseñoVisualTotal.replace("%", ""))} onChange={e => setDiseñoVisualTotal(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="interaction" /> Logica de los componentes:</p>
                                <Input className="input-description-pychart" value={LogicaComponentesTotal} onBlur={() => { !LogicaComponentesTotal.length ? setLogicaComponentesTotal("") : setLogicaComponentesTotal(LogicaComponentesTotal + "%") }} onFocus={() => setLogicaComponentesTotal(LogicaComponentesTotal.replace("%", ""))} onChange={e => setLogicaComponentesTotal(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="apartment" /> Arquitectura de las conexiones:</p>
                                <Input className="input-description-pychart" value={ArquitecturaComponentesTotal} onBlur={() => { !ArquitecturaComponentesTotal.length ? setArquitecturaComponentesTotal("") : setArquitecturaComponentesTotal(ArquitecturaComponentesTotal + "%") }} onFocus={() => setArquitecturaComponentesTotal(ArquitecturaComponentesTotal.replace("%", ""))} onChange={e => setArquitecturaComponentesTotal(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="cloud-upload" /> Despliegue en Producción:</p>
                                <Input className="input-description-pychart" value={ProduccionTotal} onBlur={() => { !ProduccionTotal.length ? setProduccionTotal("") : setProduccionTotal(ProduccionTotal + "%") }} onFocus={() => setProduccionTotal(ProduccionTotal.replace("%", ""))} onChange={e => setProduccionTotal(e.target.value)} />
                            </div>
                            <div className="buttom-save-pychart-data" onClick={changeTotal}>
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
                        : renderOption === 'tiempo_total' ? 
                            <TiempoTotal path={props.name}/>
                        : renderOption === 'archivos' ? 
                            <Archivos />
                        : renderOption === 'actualizaciones' ? 
                            <Actualizaciones name={props.name} subjects={props.subjects}/>
                        : renderOption === 'entregables' ? 
                            <Entregables />
                        : renderOption === 'solicitudes' ? 
                            <Solicitudes name={props.name}/>
                        : <div/>
                    }
                </div>
            </div>
        </div>
    )
}

export default BodyAdminProyects;