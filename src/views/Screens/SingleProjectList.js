import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/SingleProjectList.css'
import firebase from 'firebase'
// import BodyAdminProyects from '../'

import { Button } from 'antd'

const SingleProjectList = () => {

    const {state, actions} = useContext(Context)
    const db = firebase.firestore()
    const [localProjectsData, setLocalProjectsData] = useState([])
    const [localProjectsName, setLocalProjectsName] = useState([])
    const [showProjet, setShowProject] = useState(false)

    useEffect(() => {
        db.collection('responses').get().then(querySnapshot => {
            setLocalProjectsName(querySnapshot.docs.map(doc => doc.id))
            setLocalProjectsData(querySnapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        !showProjet ?
            <div className='main-project-list-container'>
                {/* <Button onClick={() => console.log(localProjectsData)}>Check</Button> */}
                <section className="accepted-projects-mapper-container">
                    {
                        localProjectsData.map((project, i) => 
                            <div className="projects-mapper">
                                <h4 className="project-name" >{localProjectsName[i]}</h4>
                                <h4 className="project-date" >{project.metadata.demo_date}</h4>
                                <h4 className="project-incharge" >{project.metadata.in_charge.name}</h4>
                            </div>
                        )
                    }
                </section>
            </div>
        : <div />
            // <BodyAdminProyects />
    )
}

export default SingleProjectList