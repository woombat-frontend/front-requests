import React, { useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon } from 'antd';
import Context from '../../../GlobalState/context';

// Import Screens
import ProyectosCreados from '../../Screens/ProyectosCreados'
import Proyectos from '../../Screens/Proyectos'
import Historial from '../../Screens/Historial'
import Solicitudes from '../../Screens/Solicitudes'
import Entregas from '../../Screens/Entregas'
import SolicitudesProjectList from '../../Screens/SolicitudesProjectList'

// Test SweetAlert
import Sweet from '../../SweetAlert';

const LandingBody = () => {

    const {state, actions} = useContext(Context)
 
    return (
        state.current_menu_option === "Crear Proyecto" ?
            <Proyectos />
        : state.current_menu_option === "Proyectos" ? 
            <ProyectosCreados />
        : state.current_menu_option === "Historial" ? 
            <Historial />
        : state.current_menu_option === "Solicitudes" ? 
            <SolicitudesProjectList />
        : state.current_menu_option === "Entregas" ? 
            <Sweet />
        :
        <div/>
    )
}

export default LandingBody;