import React, {useState, useEffect, useContext} from 'react' 
import fire from '../FirebaseConfig/auth'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
// import db from '../FirebaseConfig/firestore'

import { Upload, message, Button, Input, Icon } from 'antd'
import Context from '../GlobalState/context';
import { FilePond } from 'react-filepond';



const P_Enpoint = props => {

    const {state, actions} = useContext(Context)
    const [localData, setLocalData] = useState({})
    const [projectData, setProjectData] = useState({name: "", description: ""})
    const [option, setOption] = useState('metadata')
    const [files, setFiles] = useState([])
    const db = firebase.firestore()
    const user = state.fire_init.auth().currentUser;
    const { TextArea } = Input
    const storage = firebase.storage()

    
    
    useEffect(() => {
        // const user = state.fire_init.auth().currentUser

        // user ? 
        //     db.doc(`users/${user.uid}/`)
        //     .get().then(res => {
        //         console.log(res.data())
        //         setLocalData(res.data())
        //     })
        // :
        //     props.history.push('login')
    }, [])

    const setProject = () => {
        db.doc(`users/${user.uid}/projects/${projectData.name}/`).set({
            name: projectData.name,
            description: projectData.description
        })
        .then(() => console.log("%c El Proyecto ha sido creado exitosamente", "color: green; font-weight: bolder"))
        .catch(err => console.log(err))
    }

    const upload = e => {
        files.map(file => 
            storage.ref('prueba/' + file.name).put(file)
                .then(() => setFiles([]))
                .catch(err => console.log(err))
        )
        
    }

    return (
        <div>
            <section>
                {
                    option === 'metadata' ? 
                        <div style={{ width: '30%' }}>
                            <h2>Nombre del Proyecto</h2>
                            <Input onChange={e => setProjectData({ ...projectData, name: e.target.value })} />
                            <h2>Descripción del Proyecto</h2>
                            <TextArea onChange={e => setProjectData({ ...projectData, description: e.target.value })} />

                            <Button type="primary" onClick={() => state.fire_init.auth().signOut()} > Cerrar Sesion </Button>
                            <Button type="primary" onClick={setProject} > Data </Button>
                        </div>
                    :
                        <div style={{padding: '4em'}}>
                            <FilePond 
                                labelIdle = "Arrastra los archivos que desees o dale click acá para buscar"
                                allowMultiple={true}
                                files = {files}
                                maxFiles={5}
                                onupdatefiles={e => {
                                    setFiles(e.map(single_file => single_file.file))
                                }}
                            />
                        </div>
                }
            </section>

            <Button style={{position: 'absolute', top: '5%', right: '25%'}} onClick={() => setOption('metadata')}>Metadata</Button>
            <Button style={{ position: 'absolute', top: '5%', right: '10%' }} onClick={() => setOption('files')}>Files</Button>
            <Button style={{ position: 'absolute', top: '5%', right: '40%' }} onClick={upload}>Upload</Button>
            <Button style={{position: 'absolute', top: '5%', right: '55%'}} onClick={() => console.log(files)}>Check Files</Button>

        </div>
        
    )
}

export default withRouter(P_Enpoint)