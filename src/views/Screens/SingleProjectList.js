import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/SingleProjectList.css'
import firebase from 'firebase'
import BodyAdminProyects from '../../views/Admin/components/BodyAdminProyects'

import { Button } from 'antd'

const SingleProjectList = () => {

    const {state, actions} = useContext(Context)
    const db = firebase.firestore()
    const [localProjectsData, setLocalProjectsData] = useState([])
    const [localProjectsName, setLocalProjectsName] = useState([])
    const [projectIndex, setProjectIndex] = useState(null)
    const [showProjet, setShowProject] = useState(false)
    const [subjects, setSubjects] = useState([])
    

    useEffect(() => {
        
        db.collection('responses').onSnapshot(querySnapshot => {
            setLocalProjectsName(querySnapshot.docs.map(doc => doc.id))
            setLocalProjectsData(querySnapshot.docs.map(doc => doc.data()))
            setSubjects(querySnapshot.docs.map(s => s.data().subjects))
        })

    }, [])

    const getIntoProject = async index => {
        await setProjectIndex(index)
        await setShowProject(true)
    }

    

    return (
        !showProjet ?
            <div className='main-project-list-container'>
                <Button onClick={() => console.log(localProjectsData)}>Check</Button>
                <section className="accepted-projects-mapper-container">
                    {
                        localProjectsData.map((project, i) => 
                            <div onClick={() => getIntoProject(i)} className="projects-mapper">
                                <h4 className="project-name" >{localProjectsName[i]}</h4>
                                <h4 className="project-date" >{project.metadata.demo_date}</h4>
                                <h4 className="project-incharge" >{project.metadata.in_charge.name}</h4>
                            </div>
                        )
                    }
                </section>
            </div>
        : 
            <BodyAdminProyects 
                info={localProjectsData[projectIndex]} 
                name={localProjectsName[projectIndex]}
                subjects={subjects[projectIndex]}
            />
    )
}

export default SingleProjectList


