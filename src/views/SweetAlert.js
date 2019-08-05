import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import { Button, Input } from 'antd';
import '../Styles/AlertStyles.css';
import Context from '../GlobalState/context';

const Sweet = () =>{

    const {state} = useContext(Context)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

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
        return (
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
                if (result.value) {
                    // console.log("YES")
                }else {
                    // console.log("NOPE")
                }
            })
        )
    }
      
      const LoginGood = () =>{
        Toast.fire({
            type: 'success',
            title: state.personal_info.gender === "f" ? "Bienvenida" : "Bienvenido" + ", " + state.personal_info.name
          })
      }

      const ProyectSendGood = () =>{
        Toast.fire({
            type: 'success',
            title: 'Tu proyecto "OCR Davivienda" se ha enviado correctamente'
          })
      }

      const ProyectSendError = () =>{
        Toast.fire({
            type: 'warning',
            title: 'Hay un error, revisa el formulario'
          })
      }
      const LoginFailed = () =>{
        Toast.fire({
            type: 'error',
            title: 'Datos incorrectos, intente de nuevo'
          })
      }
      const WizardFailedInputs = () =>{
        Toast.fire({
            type: 'warning',
            title: 'Existen campos obligatorios vacios, intente de nuevo'
          })
      }
    return(
        <div className="test">
            <h3>Sweet Alerts</h3>
            <Button onClick={ErrorAlert}>TEST ERROR</Button>
            <Button onClick={WizardQuestion}>TEST WIZARD QUESTION</Button>
            <Button onClick={LoginGood}>TEST LOGIN SUCCESSFULLY</Button>
            <Button onClick={ProyectSendGood}>TEST PROYECT SUCCESSFULLY SEND</Button>
            <Button onClick={ProyectSendError}>TEST PROYECT ERROR ALERT</Button>
            <Button onClick={LoginFailed}>TEST LOGIN ERROR ALERT</Button>
            <Button onClick={WizardFailedInputs}>TEST WIZARD ERROR EMPTY ALERT</Button>
        </div>
    )
}

export default Sweet;