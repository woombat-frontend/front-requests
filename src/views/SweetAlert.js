import React from 'react'
import Swal from 'sweetalert2';
import { Button, Input } from 'antd';
import '../Styles/AlertStyles.css';

const Sweet = () =>{

    const ErrorAlert = () =>{
        Swal.fire({
            titleText: 'Error',
            type: 'error',
            text: 'Esto es un error personalizable',
            customClass:{
                title: "title-error",
            },
            }       
        )
    }

    const WizardQuestion = () =>{
        Swal.fire({
            titleText: '¿Estas Seguro?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: "SI",
            cancelButtonText: "NO",
            text: 'Estas seguro de que quieres enviar la solicitud del proyecto sin seleccionar alguna preferencia tecnica?',
            customClass:{
                title: "title-question",
                content: "question-wizard",
                cancelButton: "button-cancel",
            },
            }       
        )
    }

    return(
        <div>
            <h3>Sweet Alerts</h3>
            <Button onClick={ErrorAlert}>TEST ERROR</Button>
            <Button onClick={WizardQuestion}>TEST WIZARD QUESTION</Button>
        </div>
    )
}

export default Sweet;