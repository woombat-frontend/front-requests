import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Landing from '../components/Landing';

const Router = () => 
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/landing" component={Landing}/>
    </Switch>

export default Router