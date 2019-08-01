import React, { useState, useContext } from 'react';
import { Icon, Input} from 'antd';
import Context from '../../../../GlobalState/context';


const datatest =[
    {date: "2019-07-20", message: "Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto.,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto."},
    {date: "2019-07-31", message: "Necesito una fecha de entrega del demo."},
    {date: "2019-98-01", message: "No me sirve la funcion de ver los radicados."}
]

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

console.log(conversation)


const Actualizaciones = () =>{

    const {state, actions} = useContext(Context)

    const [chat,setChat] = useState(false);


    return(
        <div className="container-master-actualizaciones">
            <div className={`container-show-data-actualizaciones ${chat ? "hide-component" : ""}`}>
                {datatest.map(update =>{
                    return(
                    <div className="container-data-actualizaciones">
                        <div className="container-date-actualizaciones">
                            <Icon type="clock-circle" className="icon-date-actualizaciones" /><p className="text-actualizaciones">{update.date}</p>
                        </div>
                        <div className="container-body-actualizaciones">
                            <Icon type="info-circle" /><p className="text-actualizaciones">{update.message}</p>
                        </div>
                        <div className="container-master-buttom-actualizaciones">
                            <div className="container-buttom-actualizaciones" onClick={() => setChat(true)}>
                                <Icon type="message"/><p className="text-buttom-actualizaciones">Abrir Chat</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className={`container-master-chat-actualizaciones ${chat ? "show-container" : ""}`}>
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
                    <div className="container-body-chat">
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
                    <Input placeholder="Ingrese un mensaje..." />
                    <span className="span-chat-separator" />
                    <div className="container-master-buttom-actualizaciones">
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