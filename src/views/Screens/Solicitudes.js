import React, { useState, useEffect } from 'react';
import People from '../../assets/People-asking.svg';
import { Icon, Input } from 'antd';
import '../../Styles/Solicitudes.css';
import RobotEmpty from '../../assets/Robots.svg';
import Swal from 'sweetalert2';
import firebase from 'firebase'


const { TextArea } = Input;

const datatest=[
    {title: "Arreglo de Botones en OCR", date: "23/07/19"},
    {title: "Problema con AWS en general", date: "23/07/19"},
    {title: "se ha retradaso todo el proyecto", date: "23/07/19"},
]

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

const EmptyMessage = () =>{
    Toast.fire({
        type: 'error',
        title: 'Ingrese un mensaje'
    })
}

const conversation = [
    {
        message: 'El servidor tuvo un error inesperado',
        role: 'user',
        timestamp: new Date()
    },
    {
        message: 'Ush... Qué pasó ahora?',
        role: 'admin',
        timestamp: new Date()
    },
    {
        message: 'No lo sé. estaba bien y se cayó :v',
        role: 'user',
        timestamp: new Date()
    },
    {
        message: 'Pero se cayó todo o fue solo oozie?',
        role: 'admin',
        timestamp: new Date()
    },
    {
        message: 'Fue solo oozie',
        role: 'user',
        timestamp: new Date()
    },
    {
        message: 'Pues aja... Es imposible que se caiga oozie solo',
        role: 'admin',
        timestamp: new Date()
    },
    {
        message: 'Pero entonces por qué pasó?',
        role: 'user',
        timestamp: new Date()
    },
    {
        message: 'Porque eres medio marico wn...',
        role: 'admin',
        timestamp: new Date()
    },
    {
        message: 'Nojoda, gracias por la ayuda',
        role: 'user',
        timestamp: new Date()
    },
    {
        message: '( ._.)(._. )',
        role: 'admin',
        timestamp: new Date()
    }
]


const Solicitudes = props =>{

    const [newReq, SetnewReq] = useState(false);
    const [chat,setChat] = useState(false);
    const [Message, setMessage] = useState("");
    const [localSubjets, setLocalSubjects] = useState([])
    const [singleLocalSubject, setSingleLocalSubject] = useState("")
    const [conversation, setConversation] = useState([])
    const [asunto, setAsunto] = useState("")
    const db = firebase.firestore();

    useEffect(() => {
        db.doc(`responses/${props.path}`).onSnapshot(res => {
            setLocalSubjects(res.data().subjects)
        })
    }, [])

    const CheckKey = (event) =>{
        if (event.keyCode == 13) {
            SendMessage()
        }
    }

    const makeid = length => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const SendMessage = async () =>{
        if (!Message) {
            EmptyMessage()
        }else {
            let aux = Message;
            setMessage("")
            await db.doc(`chats/${props.path}/${singleLocalSubject}/${makeid(20)}`).set({
                message: aux,
                from: 'user',
                role: 'user',
                date: new Date()
            })
        }
    }

    const GetIntoProjectRequirements = () => {
        
    }

    const LoadMessages = subject => {
        setSingleLocalSubject(subject)
        db.collection(`chats/${props.path}/${subject}`).orderBy('date').onSnapshot(res => {
            setConversation(res.docs.map(x => x.data()))
            ScrollBottom()
        })
        setChat(true) 
    }

    const ScrollBottom = () => {
        document.getElementById('scrolled').scrollTop = document.getElementById('scrolled').scrollHeight
    }

    const createNewRequest = async () => {
        let asuntos_aux = []
        await setAsunto('')
        await db.doc(`responses/${props.path}`).get()
            .then(res => asuntos_aux = res.data().subjects)
        let date = await new Date().toISOString().slice(0, 10)
        await asuntos_aux.push({ subject: asunto, date: date})

        await db.doc(`responses/${props.path}`).set({
            subjects: asuntos_aux
        }, {merge: true})
    }

    return(
        <div className="container-master-solicitudes-view">
            <div className="container-textname-solicitud-single">
                <p className="textname-project-single">Requerimientos de: {props.path}</p>
            </div>
            <div className="container-solicitudes">
                <div className="container-left-solicitudes-view">
                    <div className="container-text-new-solicitud"onClick={() => SetnewReq(true)}>
                        <p className="text-new-solicitud-view"><Icon type="plus" /> Nuevo Requerimiento</p>
                    </div>
                    <div className="container-all-master-solicitudes-view">
                        {localSubjets != 0 ? 
                        localSubjets.map((subject, i) =>{
                            return(
                            <div className="container-master-title-solicitudes-view">
                                <div className="container-text-solicitudes-view">
                                    <Icon type="info-circle" />
                                        <p className="text-description-solicitudes-view">{subject.subject}</p>
                                </div>
                                <div className="container-date-solicitudes-view">
                                    <Icon type="clock-circle" />
                                    <p className="date-description-solicitudes-view">Fecha: {subject.date}</p>
                                </div>
                                <div >  
                                    <div className="container-buttom-solicitudes-view" onClick={() => LoadMessages(subject.subject)}>
                                    <p className="text-open-chat"><Icon type="message" /> Abrir Chat</p>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                        :
                        <div className="container-empty-data-solicitudes">
                            <img src={RobotEmpty} className="robot-empty-solicitudes"></img>
                            <p className="text-empty-data-solicitudes">Al momento no existen solicitudes</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="container-right-solicitudes-view">
                    <div className={`container-new-solicitudes-view ${newReq ? "" : "hide"}`}>
                        <div className="container-create-new-solicitud-view">
                            <p className="text-create-new-solicitud-view"><Icon type="plus-circle" /> Crear Solicitud</p>
                            <hr></hr>
                        </div>
                        <div className="container-master-solicitud-modal-new">
                                <div className="container-master-input-new-solicitud">
                                    <TextArea onChange={e => setAsunto(e.target.value)} value={asunto} rows={1} placeholder="Ingrese el asunto de la solicitud" />
                            </div>
                            <span className="span-solicitud-new-modal"></span>
                            <div className="container-master-last-div-modal-new-solicitud">
                                <div onClick={createNewRequest} className="buttom-solicitud-body-new">
                                    <Icon type="check-circle"/><p className="text-buttom-solicitud-body">Crear Solicitud</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`container-master-chat-solicitudes-view ${chat ? "show" : "hide"}`}>
                        <div className="container-master-text-header-chat">
                            <div className="container-text-header-chat">
                                <Icon type="message" />
                                <div className="container-master-title-header">
                                    <p className="text-header-chat">Chat con: Maria Jose Flechas</p><div className="container-close-buttom-chat" onClick={() => setChat(false)}><Icon type="close-circle" className="icon-close-chat" /></div>
                                </div>
                            </div>
                            <div className="container-master-about">
                                <p className="header-chat-about">Acerca del mensaje:</p><p className="header-chat-about-body">Necesito una fecha de entrega del demo</p>
                            </div>
                        </div>
                        <div className="container-separator-body">
                            <div className="separator-chat-body"></div>
                        </div>
                        <div className="container-master-body-messages">
                            <div id='scrolled' className="container-body-chat-solicitudes-view">
                                {conversation.map(mensaje =>{
                                    return(
                                    mensaje.role === 'admin' ?
                                    <div className="container-balloon-emisor">
                                        <div className="container-master-balloon-emisor">
                                            <p className="message-client-body">{mensaje.message}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="container-balloon-receptor">
                                        <div className="container-master-balloon-receptor">
                                            <p className="message-client-body">{mensaje.message}</p>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="container-separator-body">
                            <div className="separator-chat-body"></div>
                        </div>
                        <div className="container-send-message-chat">
                            <Input placeholder="Ingrese un mensaje..." value={Message} onChange={e => setMessage(e.target.value)} onKeyDown={CheckKey} />
                            <span className="span-chat-separator" />
                            <div className="container-master-buttom-actualizaciones" onClick={SendMessage}>
                                <div className="container-buttom-send-chat">
                                    <Icon type="message"/><p className="text-buttom-actualizaciones">Enviar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`container-master-emptydata-solicitudes-user ${!newReq && !chat ? "show" : "hide"}`}>
                        <Icon type="warning" className="icon-emptydata-solicitudes-user" />
                        <p className="container-text-emptydata-solicitudes-user">Inicia un chat de una solicitud o crea una nueva</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solicitudes