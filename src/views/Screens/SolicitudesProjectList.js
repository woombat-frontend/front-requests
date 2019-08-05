import React, { useContext, useState, useEffect } from 'react';
import Solicitudes from '../Screens/Solicitudes'
import Context from '../../GlobalState/context';
import firebase from 'firebase'
import '../../Styles/ProyectosCreados.css'
import { Icon } from 'antd'
import People from '../../assets/People-asking.svg';


const SolicitudesProjectList = () => {

    const {state, actions} = useContext(Context)
    const [userProjects, setUserProjects] = useState([])
    const [renderOption, setRenderOption] = useState('projects_list')
    const [responseName, setResponseName] = useState("")
    const db = firebase.firestore()

    useEffect(() => {
        db.collection(`users/${state.personal_info.uid}/projects`).onSnapshot(snap =>
            setUserProjects(snap.docs.map(x => x.data()))
        )
    }, [])

    const getIntoUniqueProject = async name => {
        await setResponseName(name)
        await actions({type: 'setState', payload: {...state, uniqueProjectName: name}})
        await setRenderOption('project_unique')
    }

    const changeCurrentMenuOption = () => {
        actions({type: "setState", payload: {...state, current_menu_option: "Crear Proyecto" }})
    }

    return(
        userProjects.length === 0 ?
        <div className="container-master-empty-proyects-mapper">
            <img src={People} className="people-asking"></img>
            <p className="text-empty-proyects-mapper">Al parecer no tienes ningún proyecto aún</p>
            <div className="buttom-create-project" onClick={changeCurrentMenuOption}>
                <p className="buttom-text-create-project"><Icon type="plus-circle" /> Crear Proyecto</p>
            </div>
        </div>
        :
        renderOption === 'projects_list' ?
            <div className="created-main-container">
                <div className="user-project-mapper">
                    {
                        userProjects.map((project, i) => 
                            project.state === 'iniciado' ?
                            <div onClick={() => getIntoUniqueProject(project.name)} key={i} className="single-user-project">
                                <h4 className="user-project-name">{project.name}</h4>
                                <h4 className="user-project-demo-date">{project.demo_date}</h4>
                                <h4 className="user-project-state">
                                </h4>
                            </div>
                            :
                            console.log()
                        )
                    }
                </div>
            </div>
        :
            <Solicitudes path={responseName}/>
    )
}

export default SolicitudesProjectList;