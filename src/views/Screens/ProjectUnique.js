import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/ProjectUnique.css'
import firebase from 'firebase'
import { Button } from 'antd'
import DonnutChart from '../../Graphics/DonnutChart'
import BarChart from '../../Graphics/BarChart'

const ProjectUnique = () => {

    const {state, actions} = useContext(Context)
    const [project, setProject] = useState({})
    const db = firebase.firestore()

    useEffect(() => {
        db.doc(`responses/${state.uniqueProjectName}`).onSnapshot(querySnapshot => {
            setProject({
                name: querySnapshot.id,
                data: querySnapshot.data()
            })
        })
    }, [])

    return (
        <div className='project-unique-container'>
            {/* <Button type='primary' onClick={() => console.log(project)}>Check</Button> */}

            <h2 className="unique-project-name"> {project.name} </h2>
            <section className="progress-bar">
                <p>50% Completado</p>
            </section>

            <section className="informe-general">
                <h4 className="title">INFORME GENERAL</h4>
                <hr/>
                <i>grafica</i>
            </section>


            <section className="panel-actualizaciones">
                <h4 className="title">PANEL DE ACTUALIZACIONES</h4>
                <hr/>
                <i>datos</i>
            </section>


            <section className="informe-especifico">
                <h4 className="title">INFORME ESPECIFICO</h4>
                <hr />
                <i>grafica</i>
            </section>


            <section className="zona-carga">
                <h4 className="title">ZONA DE CARGA</h4>
                <hr/>
                <i>filepond</i>
            </section>
        </div>  
    )
}

export default ProjectUnique