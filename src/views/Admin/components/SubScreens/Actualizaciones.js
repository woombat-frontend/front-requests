import React from 'react';
import { Icon } from 'antd';


const datatest =[
    {date: "2019-99-99", message: "Necesitamos el flujo de los mockups."}
]

const Actualizaciones = () =>{
    return(
        <div className="container-master-actualizaciones">
            <div className="container-show-data-actualizaciones">
                <div className="container-data-actualizaciones">
                    <div className="container-date-actualizaciones">
                        <Icon type="clock-circle" className="icon-date-actualizaciones" /><p className="text-actualizaciones">2019-99-99</p>
                    </div>
                    <div>
                        <p className="text-actualizaciones">2019-99-99</p>
                    </div>
                    <div className="container-buttom-actualizaciones">
                        <p className="text-buttom-actualizaciones">boton</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actualizaciones;