import React, {useState} from 'react'
import { Icon, Input, DatePicker, Upload, message, Checkbox } from 'antd'
import Amazon from '../../assets/brands/Amazon.svg';
import Azure from '../../assets/brands/Azure.svg';
import Cloudera from '../../assets/brands/Cloudera.svg';
import Lambda from '../../assets/brands/Lambda.svg';

const Proyectos = () => {

    function onChange(date, dateString) {
        console.log(date, dateString);
      }
    const { TextArea } = Input;

    const { Dragger } = Upload;

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
      {name: "Amazon", svg: Amazon},
      {name: "Azure", svg: Azure},
      {name: "Cloudera", svg: Cloudera},
      {name: "Lambda", svg: Lambda}
      ]

      const [tecnologia, setTecnologia] = useState("No selecciono");
      const [otherTech, setOtherTech] = useState(true)
      const [buttonsState, setButtonsState] = useState({
          "Amazon": false,
          "Azure": false,
          "Cloudera": false,
          "Lambda": false,
      })

      const setName = e =>{
        console.log(e)
        otherTech ? 
            setButtonsState({... buttonsState, [e]: !buttonsState[e]})
        : console.log()

        setTecnologia(e)
      }

      const resetButtonsState = () => {
          setOtherTech(!otherTech)
          setButtonsState(false)
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
                            <p className="title-proyect-input"><Icon type="font-size" /> Titulo del Proyecto</p>
                            <Input />
                        </div>
                        <div className="container-date-input">
                            <p className="title-proyect-input"><Icon type="clock-circle" /> Estimado del Demo</p>
                            <DatePicker onChange={onChange} placeholder="Seleccionar Fecha" className="input-proyectos-style-datepicker" />
                        </div>
                    </div>
                    <div className="container-master-descripcion">
                        <p className="title-proyect-input"><Icon type="file-text" /> Descripcion del Proyecto</p>
                        <TextArea rows={4} className="text-area-resize" />
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
                        {technologies.map((technology, id) =>{
                            //console.log(${rute_svg}${technology.svg})
                            return(
                                <div className={`container-checkbox-technologies ${buttonsState[technology.name] ? "checkbox-active" : ""}`} onClick={() => setName(technology.name)}>
                                    { 
                                        id === 2 ? 
                                        <img src={technology.svg}/>
                                        :  
                                        <img src={technology.svg} className="brands-checkbox"/>
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
                            disabled={otherTech}
                            rows={3} className="text-area-resize" 
                        />
                    </div>
                </div>
                <div className="container-upload-files">
                    <div className="container-down">
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Haz click o arrastra los archivos para cargarlos (Max. 15MB)</p>
                        </Dragger>
                    </div>
                </div>
                <div className="container-final-process">
                    <div onClick={() => console.log(otherTech)} className="buttom-final">
                        <p className="text-buttom-final"><Icon type="select" className="icon-buttom-final" /> Finalizar</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Proyectos