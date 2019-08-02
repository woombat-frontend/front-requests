import React, { useState, useContext, useEffect } from 'react';
import { Icon, Input} from 'antd';
import Context from '../../../../GlobalState/context';
import Swal from 'sweetalert2';
import firebase from 'firebase'


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

const datatest =[
    {date: "2019-07-20", message: "Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto.,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto."},
    {date: "2019-07-31", message: "Necesito una fecha de entrega del demo."},
    {date: "2019-98-01", message: "No me sirve la funcion de ver los radicados."}
]





const Actualizaciones = props =>{

    const {state, actions} = useContext(Context)
    const [chat,setChat] = useState(false);
    const [Message, setMessage] = useState("");
    const [conversation, setConversation] = useState([])
    const [messagesId, setMessagesId] = useState([])
    const [localSubject, setLocalSubject] = useState("")
    const db = firebase.firestore()

    useEffect(() => {
        // db.collection(`chats/${props.name}/`).onSnapshot(querySnapshot => {
        //     console.log("NOMBRE DEL PROYECTO: ", querySnapshot.docs)
        //     querySnapshot.docs.map(x => console.log(x.id))
        //     // console.log(querySnapshot.data())
        // }onClick={putData} 
    }, [])

    const loadConversation = subject => {

        setLocalSubject(subject)
        db.collection(`chats/${props.name}/${subject}`).orderBy('date').onSnapshot(res => {
            
            setConversation(res.docs.map(x => x.data()))
            ScrollBottom()
        })
        setChat(true)
    }

    const put = async ()  => {
        let messages = []
        await db.collection(`chats/Eagle View/graficas/`).get().then(x => {
            x.docs.map(i => messages.push(i.id))
        }) 

        !messages.length ? 
            await db.doc(`chats/Eagle View/graficas/1`).set({
                message: "hola tu",
                from: 'camila',
                date: '2019-02-16'
            })
            : await db.doc(`chats/Eagle View/graficas/${parseInt(messages[messages.length - 1]) + 1}`).set({
                message: "hola tu",
                from: 'camila',
                date: '2019-02-16'
            })
    }

    const CheckKey = (event) => {
        if (event.keyCode == 13) {
            CheckMessage()
        }
    }

    const CheckMessage = () => {
        ScrollBottom()
        if (!Message) {
            EmptyMessage()
        }else {
            SendMessage()
        }
    }

    const ScrollBottom = () => {
        document.getElementById('scrolled').scrollTop = document.getElementById('scrolled').scrollHeight
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

    const SendMessage = async () => {
        alert(localSubject)
        let aux = Message;
        setMessage("")
        await db.doc(`chats/${props.name}/${localSubject}/${makeid(20)}`).set({
            message: aux,
            from: 'user',
            role: 'user',
            date: new Date()
        })
    }
    
    return(
        <div className="container-master-actualizaciones">
            <div className={`container-show-data-actualizaciones ${chat ? "hide-component" : ""}`}>
                {props.subjects.map((sub, i) => {
                    return (
                    <div className="container-data-actualizaciones">
                        <div className="container-date-actualizaciones">
                            <Icon type="clock-circle" className="icon-date-actualizaciones" /><p className="text-actualizaciones">2019-04-13</p>
                        </div>
                            <div onClick={() => console.log(conversation)} className="container-body-actualizaciones">
                            <Icon type="info-circle" /><p className="text-actualizaciones">{sub}</p>
                        </div>
                        <div className="container-master-buttom-actualizaciones">
                                <div className="container-buttom-actualizaciones" onClick={() => loadConversation(sub)}>
                                <Icon type="message"/><p className="text-buttom-actualizaciones">Abrir Chat</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div  className={`container-master-chat-actualizaciones ${chat ? "show-container" : ""}`}>
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
                    <div id="scrolled" className="container-body-chat">
                        {conversation.map(mensaje =>{
                            return(
                            mensaje.role === 'user' ?
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
                    <Input value={Message} placeholder="Ingrese un mensaje..." onChange={e => setMessage(e.target.value)} onKeyDown={CheckKey} />
                    <span className="span-chat-separator" />
                    <div className="container-master-buttom-actualizaciones" onClick={CheckMessage}>
                        <div className="container-buttom-send-chat">
                            <Icon type="message"/><p className="text-buttom-actualizaciones">Enviar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actualizaciones;