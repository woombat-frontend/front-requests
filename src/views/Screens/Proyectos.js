import React, { useState, useContext } from 'react'
import { Icon, Input, DatePicker, Upload, message, Checkbox } from 'antd'
import Amazon from '../../assets/brands/Amazon.svg';
import Azure from '../../assets/brands/Azure.svg';
import Cloudera from '../../assets/brands/Cloudera.svg';
import Lambda from '../../assets/brands/Lambda.svg';
import { FilePond } from 'react-filepond';
import firebase from 'firebase'
import Context from '../../GlobalState/context';
import Swal from 'sweetalert2';
import '../../Styles/AlertStyles.css'

const Proyectos = () => {

    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { state, actions } = useContext(Context)
    const db = firebase.firestore()
    const storage = firebase.storage()

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} Archivo subido con exito.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} Ha ocurrido un error al subir el archivo.`);
            }
        },
    };

    let rute_svg = "../../assets/brands/";

    const technologies = [
        { name: "Amazon", svg: Amazon },
        { name: "Azure", svg: Azure },
        { name: "Cloudera", svg: Cloudera },
        { name: "Lambda", svg: Lambda }
    ]

    const [tecnologias, setTecnologias] = useState([])
    const [dateAux, setDateAux] = useState("")
    const [mandatoryData, setMandatoryData] = useState({
        name: "",
        description: "",
        date: ""
    })
    const [optionalTech, setOptionalTech] = useState("")
    const [otherTech, setOtherTech] = useState(true)
    const [buttonsState, setButtonsState] = useState({
        "Amazon": false,
        "Azure": false,
        "Cloudera": false,
        "Lambda": false,
    })
    const [files, setFiles] = useState([])
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    const setName = e => {
        // console.log(e)
        setButtonsState({ ...buttonsState, [e]: !buttonsState[e] })

        !buttonsState[e]
            ? setTecnologias([...tecnologias, e])
            : tecnologias.splice(tecnologias.indexOf(e), 1)
    }

    const resetButtonsState = () => {
        setOtherTech(!otherTech)
        setOptionalTech("")
        // setButtonsState(false)
    }

    const changeDate = (date, dateString) => {
        setDateAux(date)
        setMandatoryData({ ...mandatoryData, date: dateString })
    }

    const validateData = () => {
        if (!Object.values(mandatoryData).includes("")) {
            return true
        } else {
            Toast.fire({
                type: 'warning',
                title: 'Existen campos obligatorios vacios, intente de nuevo'
            })
            return false
        }

    }

    const createProject = () => {
        db.doc(`users/${state.personal_info.uid}/projects/${mandatoryData.name}`)
            .set({
                name: mandatoryData.name,
                description: mandatoryData.description,
                demo_date: mandatoryData.date,
                technologies: tecnologias,
                preferences: optionalTech,
                state: "espera"
            })
            .then(() => {
                files.map(file =>
                    storage.ref(`users/${state.personal_info.uid}/${mandatoryData.name}/` + file.name).put(file)
                        .then(() => console.log("%c Archivo Cargado"))
                        .catch(err => console.log(err))
                )
            })
            .then(() => {
                setFiles([])
            })
            .then(() => {
                Toast.fire({
                    type: 'success',
                    title: 'Tu proyecto se ha enviado correctamente'
                })
                resetInputs()
            })
    }


    const sendData = () => {

        if ( validateData() ) {

            if (!tecnologias.length && !optionalTech) {
                Swal.fire({
                    titleText: '¿Estas Seguro?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: "SI",
                    cancelButtonText: "NO",
                    text: 'Estas seguro de que quieres enviar la solicitud del proyecto sin seleccionar alguna preferencia tecnica?',
                    customClass: {
                        title: "title-question",
                        content: "question-wizard",
                        cancelButton: "button-cancel",
                    },
                }).then((result) => {
                    result.value ?
                        createProject()
                        :
                        console.log()
                })
            }else {
                createProject()
            }
        }
        

    }

    const resetInputs = () => {
        setMandatoryData({
            name: "",
            description: "",
            date: ""
        })
        setDateAux('')
        setButtonsState({
            "Amazon": false,
            "Azure": false,
            "Cloudera": false,
            "Lambda": false,
        })
        setOptionalTech('')
        setOtherTech(true)
        setFiles()
    }

    return (
        <React.Fragment>
            <div className="container-master-proyectos">


                <div className="container-left">
                    <div className="buttom-proyectos">
                        <p className="text-buttom-proyectos"><Icon type="profile" /> Descripcion General</p>
                    </div>
                    <div className="container-master-descripcion-up">
                        <div className="container-title-descripcion">
                            <p className="title-proyect-input"><Icon type="font-size" /> Título del Proyecto <span style={{ color: 'red', fontWeight: 'bolder' }}> *</span></p>
                            <Input value={mandatoryData.name} onChange={e => setMandatoryData({ ...mandatoryData, name: e.target.value })} />
                        </div>
                        <div className="container-date-input">
                            <p className="title-proyect-input"><Icon type="clock-circle" /> Estimado del Demo <span style={{ color: 'red', fontWeight: 'bolder' }}> *</span> </p>
                            <DatePicker value={dateAux} onChange={changeDate} placeholder="Seleccionar Fecha" className="input-proyectos-style-datepicker" />
                        </div>
                    </div>
                    <div className="container-master-descripcion">
                        <p className="title-proyect-input"><Icon type="file-text" /> Descripcion del Proyecto <span style={{ color: 'red', fontWeight: 'bolder' }}> *</span> </p>
                        <TextArea value={mandatoryData.description} onChange={e => setMandatoryData({ ...mandatoryData, description: e.target.value })} rows={4} className="text-area-resize" />
                    </div>
                </div>
                <div className="container-right">
                    <div className="buttom-proyectos">
                        <p className="text-buttom-proyectos"><Icon type="tool" /> Preferencias Tecnicas</p>
                    </div>
                    <div>
                        <p className="title-proyect-input"><Icon type="check-square" /> Seleccione sus preferencias tecnicas a tener en cuenta</p>
                    </div>
                    <div className="container-technologies">
                        {technologies.map((technology, id) => {
                            //console.log(${rute_svg}${technology.svg})
                            return (
                                <div className={`container-checkbox-technologies ${buttonsState[technology.name] ? "checkbox-active" : ""}`} onClick={() => setName(technology.name)}>
                                    {
                                        id === 2 ?
                                            <img src={technology.svg} />
                                            :
                                            <img src={technology.svg} className="brands-checkbox" />
                                    }
                                </div>
                            )
                        })}
                        <div className={`container-checkbox-technologies ${!otherTech ? "checkbox-active" : ""}`} onClick={resetButtonsState}>
                            <p className="text-technologies">Otro...</p>
                        </div>
                    </div>
                    <div className="container-master-descripcion">
                        <p className="title-proyect-input"><Icon type="exclamation-circle" /> Otras preferencias tecnicas</p>
                        <TextArea
                            onChange={e => setOptionalTech(e.target.value)}
                            disabled={otherTech}
                            rows={3} className="text-area-resize"
                            value={optionalTech}
                        />
                    </div>
                </div>
                <div className="container-upload-files">

                    <FilePond
                        labelIdle='Arrastra los archivos que desees o dale click acá para buscar (Max. 3)'
                        allowMultiple={true}
                        files={files}
                        maxFiles={3}
                        onupdatefiles={e => {
                            setFiles(e.map(single_file => single_file.file))
                        }}
                    />
                </div>
                <div className="container-final-process">
                    <div onClick={sendData} className="buttom-final">
                        <p className="text-buttom-final"><Icon type="select" className="icon-buttom-final" /> Finalizar</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Proyectos