import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/ProjectUnique.css'
import firebase from 'firebase'
import { Button } from 'antd'
import DonnutChart from '../../Graphics/DonnutChart'
import BarChart from '../../Graphics/BarChart'
import { Icon, Progress } from 'antd';
import { FilePond } from 'react-filepond';



const datatest=[
    {message: "el jefe de proyecto necesita nuevos datos para seguir con la generacion de mockups y la posterior presentacion del demo al cliente", date: "23/07/19"},
    {message: "se ha retradaso todo el proyecto", date: "23/07/19"},
    {message: "se ha retradaso todo el proyecto", date: "23/07/19"}
]
 

const ProjectUnique = props => {

    const [files, setFiles] = useState([])

    const {state, actions} = useContext(Context)
    const [animation, setAnimation] = useState({})
    const [donnutData, setDonnutData] = useState({
        data: [25, 25, 25, 25],
        colors: [
            '#006cf1',
            '#38C0FF',
            '#ba43ae',
            '#7000f1'
        ],
        labels: [
            'Diseño Visual',
            'Logica de Componentes',
            'Arquitectura de Conexiones',
            'Despliegue en producción'
        ],
        backgroundColor: "#323232",
        size: '65%'
    })
    const [barData, setBarData] = useState({
        data: [],
        colors: [
            '#006cf1',
            '#38C0FF',
            '#ba43ae',
            '#7000f1'
        ],
        labels: [
            'Diseño Visual',
            'Logica de Componentes',
            'Arquitectura de Conexiones',
            'Despliegue en producción'
        ],
        backgroundColor: "#323232",
        size: '65%'
    })


    const [icons, setIcons] = useState(['highlight', 'interaction', 'apartment', 'cloud-upload'])

    const [project, setProject] = useState({})
    const db = firebase.firestore()

    const [ScreenUnique, setScreenUnique] = useState("grafica");

    const buttoms = [
        {name: "Graficas", id: "grafica", icon: "pie-chart"},
        {name: "Informe", id: "informe", icon: "exclamation-circle"}
    ]

    useEffect(() => {
        db.doc(`responses/${props.path}`).onSnapshot(res => {
            setDonnutData({
                ...donnutData,
                data: res.data().piechart_categories,
            })
        })
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
            <section className="container-unique-project-name">
                <div className="container-project-name">
                    <Icon type="project" />
                    <h2 className="unique-project-name"> {project.name} </h2>
                </div>
            </section>
            <section className="section-text-status">
                <div className="container-text-state">
                    <p className="text-state-project">Estado: En proceso</p>
                </div>
            </section>
            <section className="container-master-progress-bar">
                <div className="container-progress-bar">
                    <Progress percent={50} />
                </div>
            </section>
            <section className="container-changebuttoms">
                <div className="container-master-buttoms">
                    {buttoms.map(boton =>{
                        return(
                        <div className={`container-buttom-change-screen ${ScreenUnique === boton.id ? "active-buttom" : ""}`} onClick={() => setScreenUnique(boton.id)}>
                            <Icon type={boton.icon} /><p className="text-change-screen-project-unique">{boton.name}</p>
                        </div>
                        )
                    })}
                </div>
            </section>
            {ScreenUnique === "grafica" ?
            <React.Fragment>
                <section className="informe-general">
                    <h4 className="title"><Icon type="pie-chart" /> INFORME GENERAL</h4>
                    <hr/>
                    <div className="container-master-chart">
                        <div className="container-chart" onClick={() => setAnimation({transform: 'translateX(-100%)'})}>
                            <DonnutChart data={donnutData} />
                            <section className="categories-container-project-unique">
                                {
                                    !state.chart_data.length ? 
                                        donnutData.labels.map((cat, i) =>
                                            <div style={{background: donnutData.colors[i]}} className={`cat_${i + 1} single-cat-project-unique`}>
                                                <Icon className="cat-icon" type={icons[i]} />
                                                <h4 className="cat-name">{cat}</h4>
                                                <h4 className="cat-percent">{donnutData.data[i]}%</h4>
                                            </div>
                                        )
                                    :
                                        donnutData.labels.map((cat, i) =>
                                            <div style={{ background: donnutData.colors[i]}} className={`cat_${i + 1} single-cat-project-unique`}>
                                                <Icon className="cat-icon" type={icons[i]} />
                                                <h4 className="cat-name">{cat}</h4>
                                                <h4 className="cat-percent">{state.chart_data[i]}%</h4>
                                            </div>
                                        )
                                }
                            </section>
                        </div>
                    </div>
                </section>
                <section className="informe-especifico">
                    <h4 className="title"><Icon type="bar-chart" /> INFORME ESPECIFICO</h4>
                    <hr />
                    <div className="container-chart-vertical">
                        <div className="container-bars">
                            <BarChart
                                data={barData}
                                path={props.path}
                            />
                        </div>
                    </div>
                </section>
            </React.Fragment>
            :
            <React.Fragment>
                <section className={`panel-actualizaciones`}>
                    <h4 className="title">PANEL DE ACTUALIZACIONES</h4>
                    <hr/>
                    <div className="container-master-updates-proyect-unique">
                        <div className="container-updates-proyect-unique">
                            {datatest.map(data =>{
                                return(
                                <div className="container-update">
                                    <div className="container-update-data">
                                        <Icon type="info-circle"/><p className="text-update">{data.message}</p>
                                    </div>
                                    <div className="container-date-data">
                                        <Icon type="clock-circle"/><p className="date-update">{data.date}</p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className={`zona-carga`}>
                    <h4 className="title">ZONA DE CARGA</h4>
                    <hr/>
                    <div className="container-master-upload-zone">
                        <FilePond
                            labelIdle='Arrastra los archivos que desees o dale click acá para buscar (Max. 3)'
                            allowMultiple={true}
                            files={files}
                            maxFiles={3}
                            onupdatefiles={e => {
                                setFiles(e.map(single_file => single_file.file))
                            }}
                        />
                    </div>
                    <div className="container-master-buttom">
                        <div className="buttom-upload-zone">
                            <p className="buttom-text-upload-zone">Cargar Archivos</p>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            }
        </div>  
    )
}

export default ProjectUnique