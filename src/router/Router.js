import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../Components/Login';

const Router = () => 
    <Switch>
        <Route path="/" exact component={Login}/>
    </Switch>

export default Router