import React, { useState } from 'react';
import { Icon, Input} from 'antd';


const datatest =[
    {date: "2019-07-20", message: "Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto.,Necesitamos el flujo de los mockups para el dia martes porque si no no se presenta el proyecto."},
    {date: "2019-07-31", message: "Necesito una fecha de entrega del demo."},
    {date: "2019-98-01", message: "No me sirve la funcion de ver los radicados."}
]

const Actualizaciones = () =>{

    const [chat,setChat] = useState(false);
    const [test,setTest] = useState(false);

    let clase = "";
    let testclass = "";

    const change = () =>{
        setChat(true)
        if (chat) {
            setChat(false)
        }
    }

    console.log(chat)

    return(
        <div className="container-master-actualizaciones">
            <div className={`container-show-data-actualizaciones ${chat ? "hide-container" : ""}`}>
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
                            <div className="container-buttom-actualizaciones" onClick={change}>
                                <Icon type="message"/><p className="text-buttom-actualizaciones">Abrir Chat</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className={`container-master-chat-actualizaciones ${clase} ${testclass}`}>
                {/* <p onClick={e => setChat(false)}>test</p>
                <p onClick={e => setTest(true)}>test animation</p> */}
                <div className="container-master-text-header-chat">
                    <div className="container-text-header-chat">
                        <Icon type="message" /><p className="text-header-chat">Chat con: Maria Jose Flechas</p>
                    </div>
                    <div className="container-master-about">
                        <p className="header-chat-about">Acerca del mensaje:</p><p className="header-chat-about-body">Necesito una fecha de entrega del demo</p>
                    </div>
                </div>
                <div className="container-separator-body">
                    <div className="separator-chat-body"></div>
                </div>
                <div>
                    <p>hola</p>
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