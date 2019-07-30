import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import '../../Styles/SingleProjectList.css'

const SingleProjectList = () => {

    const {state, actions} = useContext(Context)

    return (
        <div className='main-project-list-container'>
            
        </div>
    )
}

export default SingleProjectList