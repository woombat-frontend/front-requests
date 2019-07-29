import React from 'react';
import User_male from '../../assets/User-icon.svg';
import User_female from '../../assets/User-icon-girl.svg';
import { Input , Icon } from 'antd';

const InicioAdmin = () =>{

    const proyectos = [
        { name: "Andres Cantor", gender: "m", notifications: "1", proyect: "OCR Davivienda" },
        { name: "Yesica Chautá", gender: "f", notifications: null, proyect: "EagleView" },
        { name: "Maria Jose Flechas", gender: "f", notifications: null, proyect: "Comercio" },
        { name: "Camilo Hernandez", gender: "m", notifications: "2", proyect: "Banca Digital" }
    ]
    
    return(
        <div className="container-master-inicio-admin">
            <div className="container-row-admin-proyects">
                <div className="input-search-admin">
                    <Icon type="search" className="icon-admin-search" /><Input placeholder="Filtrar por jefe de proyecto..." />
                </div>
            </div>
            <span className="border-span-admin"></span>
            <div className="container-row-admin-users">
                <div className="container-master-users-admin">
                    {proyectos.map(user =>{
                        return(
                            <div className="container-user-admin">
                                {user.gender === "m" ? <img src={User_male} className="icon-user-admin"/> : <img src={User_female} className="icon-user-admin"/>}
                                <p className="text-name-user-admin">{user.name}</p>
                                {user.notifications === null ? <div/> :<span className="span-notifications-user-admin">{user.notifications}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default InicioAdmin;