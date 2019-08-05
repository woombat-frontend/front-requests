import React, { useContext, useState, useEffect } from 'react';
import Solicitudes from '../Screens/Solicitudes'
import Context from '../../GlobalState/context';
import firebase from 'firebase'
import '../../Styles/ProyectosCreados.css'

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

    return(
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