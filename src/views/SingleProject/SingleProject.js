import React, {useState, useEffect, useContext} from 'react' 
import Context from '../../GlobalState/context';
import { withRouter } from 'react-router-dom'

const SingleProject = props => {

    const {state, actions} = useContext(Context)
    
    useEffect(() => {
        state.single_project_view === "" 
        ?   props.history.push('admin')
        :   console.log("HELLO")
    
    }, [])

    return (
        <div className=''>
            <h2>Single Project</h2>
        </div>
    )
}

export default withRouter(SingleProject)    