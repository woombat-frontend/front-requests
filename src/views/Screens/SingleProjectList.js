import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/SingleProjectList.css'
import firebase from 'firebase'
import BodyAdminProyects from '../../views/Admin/components/BodyAdminProyects'
import Robots from '../../assets/Robots.svg';

import { Button, Input, Icon } from 'antd'

const SingleProjectList = () => {

    const {state, actions} = useContext(Context)
    const db = firebase.firestore()
    const [localProjectsData, setLocalProjectsData] = useState([])
    const [localProjectsName, setLocalProjectsName] = useState([])
    const [projectIndex, setProjectIndex] = useState(null)
    const [showProjet, setShowProject] = useState(false)
    const [subjects, setSubjects] = useState([])
    const [filterText, setFilterText] = useState("")
    const [filterList, setFilterList] = useState([])
    

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

    const Filter = value => {
        setFilterText(value)
        setFilterList(localProjectsName.filter(x => x.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <div style={{width: '100%'}}>
            {
                !showProjet ?
                    <React.Fragment>
                    <div style={{ paddingTop: '2em', width: '100%' }}>
                        <div style={{ marginBottom: '1em' }} className="container-row-admin-proyects">
                            <div className="input-search-admin">
                                <Icon type="search" className="icon-admin-search" /><Input value={filterText} placeholder="Filtrar por nombre del proyecto" onChange={e => Filter(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="hr-project" />
                    </React.Fragment>
                    : <div />
            }
            {
                !showProjet && !filterList.length && !filterText.length ?
                    

                        
                        <div className='main-project-list-container'>
            
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
                    
                    
                : !showProjet && filterList.length ?
                    
                        <div className='main-project-list-container'>
        
                            <section className="accepted-projects-mapper-container">
                                {
                                    filterList.map((project, i) =>
                                        <div onClick={() => getIntoProject(i)} className="projects-mapper">
                                            <h4 className="project-name" >{project}</h4>
                                            <h4 className="project-date" >{localProjectsData[i].metadata.demo_date}</h4>
                                            <h4 className="project-incharge" >{localProjectsData[i].metadata.in_charge.name}</h4>
                                        </div>
                                    )
                                }
                            </section>
                        </div>
                    
                : !filterList.length && filterText.length ?
                <div className="container-empty-user">
                    <img src={Robots} className="robots-empty-img" />
                    <h3>No se ha encontrado ningun proyecto, intenta de nuevo...</h3>
                </div>
                
                : showProjet ?
                    <BodyAdminProyects
                        info={localProjectsData[projectIndex]}
                        name={localProjectsName[projectIndex]}
                        subjects={subjects[projectIndex]}
                        back={() => setShowProject(false)}
                    />
                : console.log()
                
            }
        </div>
    )
}

export default SingleProjectList


