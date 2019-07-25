import React from 'react'
import { Icon, Input, DatePicker, Upload, message, Button } from 'antd'

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
          if (status !== 'Subiendo...') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return (
        <React.Fragment>
            <div className="container-master-proyectos">


                <div className="container-left">
                    <div className="buttom-proyectos">
                        <p className="text-buttom-proyectos"><Icon type="profile" /> Descripcion General</p>
                    </div>
                    <div className="container-master-descripcion-up">
                        <div className="container-title-descripcion">
                            <p className="title-proyect-input">Titulo del Proyecto</p>
                            <Input />
                        </div>
                        <div className="container-date-input">
                            <p className="title-proyect-input">Estimado del Demo</p>
                            <DatePicker onChange={onChange} placeholder="Seleccionar Fecha" className="input-proyectos-style-datepicker" />
                        </div>
                    </div>
                    <div className="container-master-descripcion">
                        <p className="title-proyect-input">Descripcion del Proyecto</p>
                        <TextArea rows={4} />
                    </div>
                </div>
                <div className="container-right">
                    <div className="buttom-proyectos">
                        <p className="text-buttom-proyectos"><Icon type="tool" /> Preferencias Tecnicas</p>
                    </div>
                    <div>
                        <p className="title-proyect-input">Seleccione sus preferencias tecnicas a tener en cuenta.</p>
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
                    <Button type="primary">Finalizar</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Proyectos