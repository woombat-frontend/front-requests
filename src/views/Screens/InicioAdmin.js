import React, { useState, useEffect } from 'react';
import User_male from '../../assets/User-icon.svg';
import User_female from '../../assets/User-icon-girl.svg';
import { Input , Icon, Empty } from 'antd';
import firebase from 'firebase';
import Robots from '../../assets/Robots.svg';

const InicioAdmin = () =>{

     const projects = [
         
    ]
    const db = firebase.firestore()
    const [localUsers, setLocalUsers] = useState([])
    const [localUsersId, setLocalUsersId] = useState([])

    useEffect(() => {
        db.collection('users').get().then(querySnapshot => {
            setLocalUsers(querySnapshot.docs.map(doc => doc.data()))
            setLocalUsersId(querySnapshot.docs.map(doc => doc.id))
        })
    }, [])

    const [UsersSearch, setUsersSearch] = useState("");
    const [UsersFinals, setUsersFinals] = useState([])



    const search = value => {
        setUsersSearch(value)
        let lowerValue = value.toLowerCase()
        setUsersFinals(localUsers.filter(user => user.name.toLowerCase().includes(lowerValue)))
    }


    console.log(UsersFinals)


    return(
        <div className="container-master-inicio-admin">
            <div className="container-row-admin-proyects">
                <div className="input-search-admin">
                    <Icon type="search" className="icon-admin-search" /><Input placeholder="Filtrar por jefe de proyecto..." onChange={e => search(e.target.value) } />
                </div>
            </div>
            <span className="border-span-admin"></span>
            <div className="container-row-admin-users">
                <div className="container-master-users-admin">
                    {!UsersSearch.length ? 
                    localUsers.map(user =>{
                        return(
                            user.role !== 'admin' ? 
                            <div className="container-user-admin">
                                {user.gender === "m" ? <img src={User_male} className="icon-user-admin"/> : <img src={User_female} className="icon-user-admin"/>}
                                <p className="text-name-user-admin">{user.name}</p>
                                {/* {user.notifications === null ? <div/> :<span className="span-notifications-user-admin">{user.notifications}</span>} */}
                            </div>
                            : null
                        )
                    })
                    :
                    UsersFinals.map(user =>{
                        
                        return(
                            user.role !== 'admin' ? 
                            <div className="container-user-admin">
                                {user.gender === "m" ? <img src={User_male} className="icon-user-admin"/> : <img src={User_female} className="icon-user-admin"/>}
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
    )
}

export default InicioAdmin;