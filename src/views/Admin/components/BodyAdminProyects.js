import React, { useState, useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon, Input } from 'antd';
import Context from '../../../GlobalState/context';
import Swal from 'sweetalert2';

import UserMale from '../../../assets/User-icon.svg';
import UserFemale from '../../../assets/User-icon-girl.svg';

/* Subs Screens */

import General from '../components/SubScreens/General';
import Archivos from '../components/SubScreens/Archivos';
import Actualizaciones from '../components/SubScreens/Actualizaciones';
import Entregables from '../components/SubScreens/Entregables';
import Solicitudes from '../components/SubScreens/Solicitudes';

const Menus = [
    { title: "Informe General", action: "general" },
    { title: "Archivos", action: "archivos" },
    { title: "Actualizaciones", action: "actualizaciones" },
    { title: "Entregables", action: "entregables" },
    { title: "Solicitudes", action: "solicitudes" }
]



const BodyAdminProyects = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
        });

    const FailedInputs = () =>{
        Toast.fire({
            type: 'error',
            title: 'Existe algun campo vacio, intente de nuevo'
            })
        }
    const FailedSum = (sum) =>{
        Toast.fire({
            type: 'error',
            title: `Suma ${sum}% para completar, intente de nuevo`
            })
        }

    const FailedSumExtra = (sum) =>{
        Toast.fire({
            type: 'error',
            title: `Debes eliminar ${sum}% de los porcentajes, intente de nuevo`
            })
        }

    const SuccessAlert = () =>{
        Toast.fire({
            type: 'success',
            title: 'Los datos han sido guardados'
            })
        }

    const { state, actions } = useContext(Context)

    const [DiseñoVisual, setDiseñoVisual] = useState("")
    const [LogicaComponentes, setLogicaComponentes] = useState("")
    const [ArquitecturaComponentes, setArquitecturaComponentes] = useState("")
    const [Produccion, setProduccion] = useState("")
    const [renderOption, setRenderOption] = useState("general")

    let diseñofinal = parseInt(DiseñoVisual.replace("%",""));
    let logicafinal = parseInt(LogicaComponentes.replace("%",""));
    let arquitecturafinal = parseInt(ArquitecturaComponentes.replace("%",""));
    let produccionfinal = parseInt(Produccion.replace("%",""));
    
    
    let finalsum = diseñofinal + logicafinal + arquitecturafinal + produccionfinal

    let allfullinputs = false

    let testinput = false

    const Diseñofilter = value =>{
        !value ? setDiseñoVisual(value) : setDiseñoVisual(value + "%")
    }

    const Logicafilter = value =>{
        !value ? setLogicaComponentes(value) : setLogicaComponentes(value + "%")
    }

    const Arquitecturafilter = value =>{
        !value ? setArquitecturaComponentes(value) : setArquitecturaComponentes(value + "%")
    }

    const Produccionfilter = value =>{
        !value ? setProduccion(value) : setProduccion(value + "%")
    }

    const diff = sumafinal =>{
        return Math.abs(sumafinal - 100);
    }

    const ButtomFinal = () =>{

        if (!DiseñoVisual) {
            testinput = true
        }

        !DiseñoVisual || !LogicaComponentes || !ArquitecturaComponentes || !Produccion
        ? 
        FailedInputs()
        : 
        allfullinputs = true;

        if (allfullinputs && finalsum !== 100) {
            FailedSum(diff(finalsum))
        }

        if (allfullinputs && finalsum > 100) {
            FailedSumExtra(diff(finalsum))
        }

        if (allfullinputs && finalsum === 100) {
            SuccessAlert()
        }
    }

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
                {
                    renderOption === 'general' ? 
                        <div className="container-master-pychart-module">
                            <div className="container-pychart-module">
                                <Icon type="pie-chart" className="pychart-icon" /><p className="title-edit-pychart-admin-proyect">Edicion del Pychart:</p>
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="highlight" /> Diseño Visual:</p>
                                <Input className="input-description-pychart" value={DiseñoVisual} onBlur={() => Diseñofilter(DiseñoVisual)} onFocus={() => setDiseñoVisual(DiseñoVisual.replace("%", ""))} onChange={e => setDiseñoVisual(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="interaction" /> Logica de los componentes:</p>
                                <Input className="input-description-pychart" value={LogicaComponentes} onBlur={() => Logicafilter(LogicaComponentes)} onFocus={() => setLogicaComponentes(LogicaComponentes.replace("%", ""))} onChange={e => setLogicaComponentes(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="apartment" /> Arquitectura de las conexiones:</p>
                                <Input className="input-description-pychart" value={ArquitecturaComponentes} onBlur={() => Arquitecturafilter(ArquitecturaComponentes)} onFocus={() => setArquitecturaComponentes(ArquitecturaComponentes.replace("%", ""))} onChange={e => setArquitecturaComponentes(e.target.value)} />
                            </div>
                            <div className="container-pychart-apartado">
                                <p className="title-description-pychart"><Icon type="cloud-upload" /> Despliegue en Producción:</p>
                                <Input className="input-description-pychart" value={Produccion} onBlur={() => Produccionfilter(Produccion)} onFocus={() => setProduccion(Produccion.replace("%", ""))} onChange={e => setProduccion(e.target.value)} />
                            </div>
                            <div className="buttom-save-pychart-data" onClick={ButtomFinal}>
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
                            <General />
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