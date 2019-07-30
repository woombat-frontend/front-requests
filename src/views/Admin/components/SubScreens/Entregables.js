import React from 'react';
import { Input, Icon } from 'antd';
import { useState } from 'react';
import { FilePond } from 'react-filepond';

const Entregables = () =>{

    const [Detalle, setDetalle] = useState("");
    const [files, setFiles] = useState([])

    return(
        <div className="container-master-entregables">
            <div className="container-sons-entregables">
                <div className="container-text-entregables">
                    <Icon type="info-circle" /><p className="text-entregables">Detalle del Entregable</p>
                </div>
                <Input className="input-entregable" onChange={e => setDetalle(e.target.value)} placeholder="Ingrese detalles del entregable..." />
                <div className="container-master-file-buttom-entregable">
                    <div>
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
                    <div className="container-buttom-entregables">
                        <div className="buttom-entregables">
                            <Icon type="cloud-server" /><p className="text-buttom-entregables">Enviar Entregable</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entregables;