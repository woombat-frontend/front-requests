import React, { useState, useEffect, useContext } from 'react';
import User_male from '../../assets/User-icon.svg';
import User_female from '../../assets/User-icon-girl.svg';
import { Input , Icon, Empty } from 'antd';
import firebase from 'firebase';
import Robots from '../../assets/Robots.svg';
import Context from '../../GlobalState/context';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../Styles/AlertStyles.css'
import { Button } from 'antd'

import Amazon from '../../assets/brands/Amazon.svg';
import Azure from '../../assets/brands/Azure.svg';
import Cloudera from '../../assets/brands/Cloudera.svg';
import Lambda from '../../assets/brands/Lambda.svg';

const InicioAdmin = props =>{

    const {state, actions} = useContext(Context)
    const db = firebase.firestore()
    const [localUsers, setLocalUsers] = useState([])
    const [localUsersId, setLocalUsersId] = useState([])
    const [UsersSearch, setUsersSearch] = useState("");
    const [UsersFinals, setUsersFinals] = useState([])
    const [projectList, setProjectList] = useState([])
    const [detailProject, setDetailProject] = useState([])
    const [userIndex, setUserIndex] = useState(0)
    const [localNames, setLocalNames] = useState([])
    let userPair = {}
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    const technologies = {
        "Amazon": Amazon,
        "Azure": Azure,
        "Cloudera": Cloudera,
        "Lambda": Lambda
    }

    useEffect(() => {
        db.collection('users').onSnapshot(querySnapshot => {
            setLocalUsers(querySnapshot.docs.map(doc => doc.data()))
            setLocalNames(querySnapshot.docs.map(doc => doc.data().name))
            setLocalUsersId(querySnapshot.docs.map(doc => doc.id))
        })
    }, [])


    const search = value => {
        setUsersSearch(value)
        let lowerValue = value.toLowerCase()
        setUsersFinals(localUsers.filter(user => user.name.toLowerCase().includes(lowerValue)))
    }


    const checkProjectDetails = option => {
        let localIndex = localNames.indexOf(option)
        setUserIndex(localIndex)

        db.collection(`users/${localUsersId[localIndex]}/projects`).onSnapshot(querySnapshot => {
            if (querySnapshot.docs.length) 
                setProjectList(querySnapshot.docs.map(doc => doc.data()))
            else
                Toast.fire({
                    type: 'error',
                    title: 'Este usuario no tiene proyectos recientes'
                })
        })
    }

    const selectProject = option => {
        setDetailProject(projectList[option])
    }

    const takeProject = async () => {
        await db.doc(`users/${localUsersId[userIndex]}/projects/${detailProject.name}`)
            .set({ state: 'iniciado' }, { merge: true })
            .then(() => {
                setProjectList([])
                setDetailProject({})
            })
        
        await db.doc(`responses/${detailProject.name}`)
            .set({
                metadata: {
                    in_charge: localUsers[userIndex],
                    user_uid: localUsersId[userIndex],
                    demo_dresponsesate: detailProject.demo_date
                },
                task: [],
                subjects: [],   
                piechart_categories: [25, 25, 25, 25],
                total_time: [0, 0, 0, 0],
                requirements: []
            })

        await Toast.fire({
            type: 'success',
            title: 'El proyecto ha sido iniciado'
        })

        
    }

    return(
        !projectList.length ? 
            <div className="container-master-inicio-admin">
                
                <div className="container-row-admin-proyects">
                    <div className="input-search-admin">
                        <Icon type="search" className="icon-admin-search" /><Input value={UsersSearch} placeholder="Filtrar por jefe de proyecto..." onChange={e => search(e.target.value)} />
                    </div>
                </div>
                <span className="border-span-admin"></span>
                <div className="container-row-admin-users">
                    <div className="container-master-users-admin">
                        {!UsersSearch.length ?
                            localUsers.map((user, i) => {
                                return (
                                    user.role !== 'admin' ?
                                        <div onClick={() => checkProjectDetails(user.name)} className="container-user-admin">
                                            {user.gender === "m" ? <img src={User_male} className="icon-user-admin" /> : <img src={User_female} className="icon-user-admin" />}
                                            <p className="text-name-user-admin">{user.name}</p>
                                            {/* {user.notifications === null ? <div/> :<span className="span-notifications-user-admin">{user.notifications}</span>} */}
                                        </div>
                                        : null
                                )
                            })
                            :
                            UsersFinals.map((user, i) => {

                                return (
                                    user.role !== 'admin' ?
                                        <div onClick={() => checkProjectDetails(user.name)} className="container-user-admin">
                                            {user.gender === "m" ? <img src={User_male} className="icon-user-admin" /> : <img src={User_female} className="icon-user-admin" />}
                                            <p className="text-name-user-admin">{user.name}</p>
                                            {/* {user.notifications === null ? <div/> :<span className="span-notifications-user-admin">{user.notifications}</span>} */}
                                        </div>
                                        : null
                                )
                            })
                        }
                    </div>
                    {!UsersFinals.length && UsersSearch.length ?
                        <div className="container-empty-user">
                            <img src={Robots} className="robots-empty-img" />
                            <h3>No se ha encontrado ningun usuario, intenta de nuevo...</h3>
                        </div>
                        :
                        null

                    }
                </div>
            </div>
        : 
            <div className='project-list-container'>
                <div className="buttom-goback-single-project" onClick={() => { setProjectList([]); setDetailProject({});}}>
                    <p className="text-buttom-goback-single-project"><Icon type="arrow-left" /> Volver</p>
                </div>
                <section className="project-mapper">         
                    {
                        projectList.map((project, i) => 
                            <div onClick={() => selectProject(i)} className="single-project-container">
                                <h3> {project.name} </h3>
                                <h4> {project.demo_date} </h4>
                                {
                                    project.state === 'espera'
                                    ? <div className="circle">
                                            <img className="state-img" src="https://i.imgur.com/ZSNBBk1.png" alt="state" />
                                      </div>
                                    : 
                                    <div className="aproved">
                                        <img className="state-img" src="https://i.imgur.com/WzEDtH8.png" alt="state" />
                                    </div>
                                }
                            </div>
                        )
                    }     
                </section>

                {
                    Object.keys(detailProject).length ? 
                        <section className="rendered-project-details">
                            <div className="grid-description">
                                <h3>Descripción del Proyecto</h3>
                                <div className="hr-single-project" />
                                <p className="project-description">{detailProject.description}</p>
                            </div>

                            <div className="grid-tech">
                                <h3>Requerimientos Técnicos</h3>
                                <div className="hr-single-project" />
                                <div className="project-tech-container">
                                    {
                                        detailProject.technologies.map(x =>

                                            <img className="container-checkbox-technologies-admin" src={technologies[x]} alt={x} />

                                        )
                                    }
                                </div>
                            </div>

                            <div className="grid-observations">
                                <h3>Obervaciones Técnicas</h3>
                                <div className="hr-single-project" />
                                <p className="technical-observations"> {detailProject.preferences} </p>
                            </div>
                            
                            <div className="grid-date">
                                <h3> Fecha para entrega del Demo </h3>
                                <div className="hr-single-project" />
                                <p className="demo-date"> {detailProject.demo_date} </p>
                            </div>

                            {/* <Button type="primary" className="accept-btn" onClick={takeProject}>Empezar</Button> */}
                            <div className="buttom-accept-single-project" onClick={takeProject}>
                                <p className="text-buttom-goback-single-project"><Icon type="check-circle" /> Empezar</p>
                            </div>
                        </section>
                    :
                        <div/>
                }
            </div>

    )
}

export default withRouter(InicioAdmin);