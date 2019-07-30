import React, { useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon } from 'antd';
import Context from '../../../GlobalState/context';

// Import Screens Admin
import InicioAdmin from '../../Screens/InicioAdmin';
import ConfiguracionesAdmin from '../../Screens/ConfiguracionesAdmin';
import UserProyectsAdmin from '../../Screens/UserProyectsAdmin';
import SingleProjectList from '../../Screens/SingleProjectList'

// Test SweetAlert
import Sweet from '../../SweetAlert';

const BodyAdmin = () => {

    const {state, actions} = useContext(Context)
 
    return (
        state.current_menu_option_admin === "Inicio" ?
            <InicioAdmin />
        : state.current_menu_option_admin === "Configuraciones" ? 
            <ConfiguracionesAdmin />
        : state.current_menu_option_admin === "Proyectos" ?
            <SingleProjectList />
        
        : <div/>
    )
}

export default BodyAdmin;