import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoute from './PrivateRoute';
import SessionLayout from './SessionRoute';
import Home from './../Home/Home';
import FrontRoute from './FrontRoute';

const Routes = () => {

   return (
      <div>
        <Switch>
            <PrivateRoute exact path='/file-manager' component={Dashboard} />
            <SessionLayout exact path='/login' component={Login} />
            <SessionLayout exact path='/register' component={Register} />
            <FrontRoute exact path='/' component={Home} />
        </Switch>
      </div>
    )
}
 
export default Routes