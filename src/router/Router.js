import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from '../views/login/Login';
import Landing from '../views/Landing/Landing';
import P_Enpoint from '../views/P_Enpoint';
import Sweet from '../views/SweetAlert';
import MappingTest from '../views/MappingTest';
import AdminView from '../views/Admin/Admin';
import SingleProject from '../views/SingleProject/SingleProject';

const Router = () => 
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/landing" component={Landing} />
        <Route path="/p_enpoint" component={P_Enpoint} />
        <Route path="/mapping" component={MappingTest} />
        <Route path="/admin" component={AdminView} />
        <Route path="/project" component={SingleProject} />
    </Switch>

export default Router