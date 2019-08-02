import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import Swal from 'sweetalert2';

const { TextArea } = Input;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

const datatest =[
    {description: "Necesitamos mas datos sobre el OCR porque no se puede continuar con el proyecto", state: "En proceso", id: "0"},
    {description: "Necesitamos que la conexion con AWS funcione bien para que retorne el radicado", state: "Enviado", id: "1"},
    {description: "Prueba de solicitud :v", state: "Enviado" , id: "2"},
    {description: "Prueba de solicitud :v", state: "Enviado" , id: "2"},
    {description: "Prueba de solicitud :v", state: "Enviado" , id: "2"},
    {description: "Prueba de solicitud :v", state: "Enviado" , id: "2"}
]

const ErrorAlert = () =>{
    Toast.fire({
        type: 'error',
        title: 'Campo vacio, ingrese su requerimiento'
      })
  }
const SuccessAlert = () =>{
    Toast.fire({
        type: 'success',
        title: 'Requerimiento enviado con exito'
      })
  }
  const SuccessDelete = () =>{
    Toast.fire({
        type: 'success',
        title: 'Requerimiento cancelado con exito'
      })
  }


const Solicitudes = () =>{

    const [showModal, setshowModal] = useState(false);
    const [Req, setReq] = useState("");


    const SendNewSolicitud = () =>{
        !Req ? ErrorAlert() : SuccessAlert()
    }

    const DeleteReq = id =>{
        SuccessDelete()
    }
    return(
        <div className="container-master-solicitudes">
            <div className="container-master-all-solicitudes">
                <div className={`container-master-divs ${showModal ? "hide-modal" : ""}`}>
                    {datatest.map(data =>{
                        return(
                        <div className="container-master-solicitud">
                            <div>
                                <p className="text-solicitud-body">{data.description}</p>
                            </div>
                            <span className="span-solicitud-body"></span>
                            <div>
                                <p className="text-state-solicitud-body">Estado: {data.state}</p>
                            </div>
                            <div>
                                <div className="buttom-solicitud-body" onClick={() => DeleteReq(data.id)}>
                                    <Icon type="close-circle" /><p className="text-buttom-solicitud-body">Cancelar Solicitud</p>
                                </div>
                            </div>
                        </div>
                        )
                    })} 
                    <div className="container-master-solicitud-new">
                        <div className="container-text-new" onClick={() => setshowModal(true)}>
                            <div className="container-icon-solicitudes-new">
                                <Icon type="plus" className="icon-solicitud-new"/>
                            </div>
                            <p className="text-solicitud-new">Nueva Solicitud</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container-new-solicitud ${showModal ? "show-modal" : ""}`}>
                <div className="container-master-solicitud-modal-new">
                    <div className="container-master-input-new-solicitud">
                        <TextArea rows={4} placeholder="Ingrese su requerimiento" onChange={e => setReq(e.target.value)} />
                    </div>
                    <span className="span-solicitud-new-modal"></span>
                    <div className="container-master-last-div-modal-new-solicitud">
                        <div className="buttom-solicitud-body-new" onClick={SendNewSolicitud}>
                            <Icon type="check-circle"/><p className="text-buttom-solicitud-body">Agregar Solicitud</p>
                        </div>
                        <div className="container-close-modal-new-solicitud" onClick={() => setshowModal(false)}>
                            <Icon type="close-circle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solicitudes;