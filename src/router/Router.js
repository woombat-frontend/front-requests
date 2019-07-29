import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from '../views/login/Login';
import Landing from '../views/Landing/Landing';
import P_Enpoint from '../views/P_Enpoint';
import Sweet from '../views/SweetAlert';
import AdminView from '../views/Admin/Admin';

const Router = () => 
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/landing" component={Landing} />
        <Route path="/admin" component={AdminView} />
        <Route path="/p_enpoint" component={P_Enpoint}/>
    </Switch>

export default Router