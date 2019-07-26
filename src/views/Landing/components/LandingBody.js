import React, { useCallback, useContext } from 'react';
import People from '../../../assets/People-asking.svg';
import { Icon } from 'antd';
import Context from '../../../GlobalState/context';

// Import Screens
import Empty from '../../Screens/Empty'
import Proyectos from '../../Screens/Proyectos'
import Historial from '../../Screens/Historial'
import Solicitudes from '../../Screens/Solicitudes'
import Entregas from '../../Screens/Entregas'

// Test SweetAlert
import Sweet from '../../SweetAlert';

const LandingBody = () => {

    const {state, actions} = useContext(Context)
 
    return (
        state.current_menu_option === "Crear Proyecto" ?
            <Proyectos />
        : state.current_menu_option === "Proyectos" ? 
            <Empty />
        : state.current_menu_option === "Historial" ? 
            <Historial />
        : state.current_menu_option === "Solicitudes" ? 
            <Solicitudes />
        : state.current_menu_option === "Entregas" ? 
            <Entregas />
        :
        <div/>
    )
}

export default LandingBody;