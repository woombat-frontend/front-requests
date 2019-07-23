import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../Components/Login';
import ProvisionalLogin from '../Components/ProvisionalLogin';

const Router = () => 
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/provisional" exact component={ProvisionalLogin}/>
    </Switch>

export default Router