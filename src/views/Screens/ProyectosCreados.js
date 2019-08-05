import React, { useContext, useState, useEffect } from 'react';
import People from '../../assets/People-asking.svg';
import { Icon } from 'antd';
import Context from '../../GlobalState/context';
import firebase from 'firebase'
import '../../Styles/ProyectosCreados.css'
import ProjectUnique from '../Screens/ProjectUnique'


import { Button } from 'antd'

const ProyectosCreados = () => {

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
                {/* <Button onClick={() => console.log(userProjects)}> Projects </Button> */}
                <div className="user-project-mapper">
                    {
                        userProjects.map((project, i) => 
                            <div onClick={() => getIntoUniqueProject(project.name)} key={i} className="single-user-project">
                                <h4 className="user-project-name">{project.name}</h4>
                                <h4 className="user-project-demo-date">{project.demo_date}</h4>
                                <h4 className="user-project-state">
                                    {
                                        project.state === 'espera' 
                                        ? <h4 style={{ color: 'rgb(190, 190, 3)'}}>Espera</h4> 
                                        : <h4 style={{color: 'cyan'}}>Iniciado</h4>
                                    }
                                </h4>
                            </div>
                        )
                    }
                </div>
            </div>
        :
            <ProjectUnique path={responseName}/>
    )
}

export default ProyectosCreados